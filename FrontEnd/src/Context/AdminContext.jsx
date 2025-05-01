import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  const [teamMembers, setTeamMembers] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const [memberData, setMemberData] = useState({
    fullName: "",
    phone: "",
    email: "",
    role: "Member",
  });

  const [chatbotSettings, setChatbotSettings] = useState({
    headerColor: "#343f4b",
    backgroundColor: "#ffffff",
    welcomeMessage: "How can I help you?",
    placeholderText: "Ask me anything!",
    botName: "Huby",
    formData: {
      name: "Your name",
      phone: "+1 (000) 000-0000",
      email: "example@gmail.com",
    },
    showForm: true,
    showChat: true,
    welcomeBubbleText: `Want to chat about Huby? I'm a chatbot here to help you find your way.`,
    missedChatTimer: {
      hours: "12",
      minutes: "00",
      seconds: "00",
      ampm: "PM",
    },
  });

  const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Unresolved");
  const [user, setUser] = useState({
    name: teamMembers[0]?.fullName || "Unassigned",
  });

  const [teamWarningVisible, setTeamWarningVisible] = useState(false);
  const [statusWarningVisible, setStatusWarningVisible] = useState(false);
  const [pendingTeamMember, setPendingTeamMember] = useState(null);

  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);

  const [createFormData, setCreateFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [chatCreated, setChatCreated] = useState(false);
  const [newChatId, setNewChatId] = useState("");
  const [savedChatId, setSavedChatId] = useState("");

  const [newchatMessages, setNewChatMessages] = useState([]);
  const [tickets, setTickets] = useState([]);

  const [averageReplyTime, setAverageReplyTime] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [missedChatsData, setMissedChatsData] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    const storedAdmin = localStorage.getItem("adminDetails");
    checkChatID();
    getSettingsFromDatabase();
    if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      setAdminDetails({
        id: parsedAdmin.id,
        firstName: parsedAdmin.firstName,
        lastName: parsedAdmin.lastName,
        email: parsedAdmin.email,
        password: "",
        confirmPassword: "",
        role: parsedAdmin.role,
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (adminDetails.id) {
        await fetchTeamMembers();
        await fetchChats();
        await retrieveChats();
      }
    };
    fetchData();
  }, [adminDetails.id]);

  useEffect(() => {
    getMessages();
  }, [selectedChat]);

  useEffect(() => {
    if (!tickets || tickets.length === 0) return;

    let resolved = 0;
    let totalTime = 0;
    let totalReplyTime = 0;
    let totalTicketsWithReply = 0;
    const missedChatsByWeek = {};

    const updatedTickets = tickets.map((ticket) => {
      const now = dayjs();
      const posted = dayjs(ticket.postedTime);
      const week = posted.week();
      const weekLabel = `Week ${week}`;
      const elapsedMinutes = now.diff(posted, "minute");
      const hours = Math.floor(elapsedMinutes / 60);
      const minutes = elapsedMinutes % 60;

      ticket.elapsedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

      totalTime += elapsedMinutes;

      if (ticket.status === "resolved") resolved++;

      if (ticket.isMissed) {
        missedChatsByWeek[weekLabel] = (missedChatsByWeek[weekLabel] || 0) + 1;
      }

      const userMsg = ticket.messages.find((m) => m.senderType === "user");
      const adminMsg = ticket.messages.find((m) => m.senderType === "admin");

      if (userMsg && adminMsg) {
        const replyTime = dayjs(adminMsg.timestamp).diff(
          dayjs(userMsg.timestamp),
          "minute"
        );
        totalReplyTime += replyTime;
        totalTicketsWithReply++;
      }

      return ticket;
    });

    const missedChatsData = Object.entries(missedChatsByWeek)
      .map(([week, value]) => ({ week, value }))
      .sort(
        (a, b) =>
          parseInt(a.week.split(" ")[1]) - parseInt(b.week.split(" ")[1])
      );

    setMissedChatsData(missedChatsData);
    setResolvedCount(resolved);
    setTotalElapsedTime(totalTime);
    setAverageReplyTime(
      totalTicketsWithReply > 0
        ? Math.round(totalReplyTime / totalTicketsWithReply)
        : 0
    );
    setTotalTickets(tickets.length);
  }, [tickets]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLoginSubmit = async () => {
    try {
      try {
        const response = await axios.post(`${url}/admin/login`, loginData);

        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);

        const [fName, ...lastParts] = response.data.admin.name.split(" ");
        const lName = lastParts.join(" ");
        const adminData = {
          id: response.data.admin.id,
          firstName: fName,
          lastName: lName,
          email: response.data.admin.email,
          password: "",
          confirmPassword: "",
          role: response.data.admin.role,
        };

        setAdminDetails(adminData);
        localStorage.setItem("adminDetails", JSON.stringify(adminData));
        navigate("/user");
        return;
      } catch (adminError) {
        console.log("Admin login failed, trying team member login");
      }

      const memberResponse = await axios.post(
        `${url}/member/loginTeamMember`,
        loginData
      );

      localStorage.setItem("token", memberResponse.data.token);
      setToken(memberResponse.data.token);

      const [fName, ...lastParts] =
        memberResponse.data.member.fullName.split(" ");
      const lName = lastParts.join(" ");
      const memberData = {
        id: memberResponse.data.member.id,
        firstName: fName,
        lastName: lName,
        email: memberResponse.data.member.email,
        password: "",
        confirmPassword: "",
        role: memberResponse.data.member.role,
      };

      setAdminDetails(memberData);
      localStorage.setItem("adminDetails", JSON.stringify(memberData));
      navigate("/user");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleRegisterSubmit = async () => {
    const apiRegisterData = {
      name: `${registerData.firstName} ${registerData.lastName}`,
      email: registerData.email,
      password: registerData.password,
    };
    try {
      const response = await axios.post(
        `${url}/admin/register`,
        apiRegisterData
      );
      if (response.data.success) {
        alert("Registration successful! Please log in.");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdminDetails({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setLoginData({ email: "", password: "" });
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });
    localStorage.removeItem("adminDetails");

    navigate("/");
  };

  const handleUpdate = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (adminDetails.role === "Member") {
      return handleMemberUpdateSubmit();
    }
    try {
      const response = await axios.put(
        `${url}/admin/updateProfile`,
        adminDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        logout();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleMemberUpdateSubmit = async () => {
    console.log("memberDetails - ", adminDetails);
    const memberUpdateData = {
      firstName: adminDetails.firstName,
      lastName: adminDetails.lastName,
      email: adminDetails.email,
      // Map password fields correctly
      newPassword: adminDetails.password,
      confirmPassword: adminDetails.confirmPassword,
    };

    console.log("Sending update data:", memberUpdateData);

    try {
      const response = await axios.put(
        `${url}/member/memberUpdate/${adminDetails.id}`,
        memberUpdateData,
        {
          // Add the authorization header
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (data.success) {
        alert("Profile updated!");
        logout();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${url}/admin/getTeamMembers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("response=", response);

      const result = response.data;

      if (result.success) {
        setTeamMembers(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch team members");
      }
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  };

  const handleDeleteClick = (memberId) => {
    setMemberToDelete(memberId);
    setShowDeleteModal(true);
  };

  const handleEditClick = (member) => {
    setMemberToEdit(member._id);
    setMemberData({
      fullName: member.fullName,
      phone: member.phone || "",
      email: member.email,
      role: member.role,
    });
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${url}/admin/deleteTeamMember/${memberToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setTeamMembers(
          teamMembers.filter((member) => member._id !== memberToDelete)
        );
      } else {
        throw new Error(result.message || "Failed to delete team member");
      }
    } catch (err) {
      alert("Error deleting team member:", err);
    } finally {
      setShowDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData({ ...memberData, [name]: value });
  };

  const handleAddMember = async () => {
    console.log("token-", token);
    if (!memberData.fullName || !memberData.email) {
      console.error("Name and email are required");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/admin/addTeamMember`,
        {
          fullName: memberData.fullName,
          phone: memberData.phone,
          email: memberData.email,
          role: memberData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setTeamMembers([...teamMembers, result.data]);

        setMemberData({ fullName: "", phone: "", email: "", role: "Member" });
        setShowAddModal(false);

        console.log("Team member added successfully");
        return true;
      } else {
        throw new Error(result.message || "Failed to add team member");
      }
    } catch (err) {
      console.error("Error adding team member:", err);
    }
  };

  const handleUpdateMember = async () => {
    if (!memberData.fullName || !memberData.email) {
      console.error("Name and email are required");
      return;
    }

    try {
      const response = await axios.put(
        `${url}/admin/updateTeamMember/${memberToEdit}`,
        {
          fullName: memberData.fullName,
          phone: memberData.phone,
          email: memberData.email,
          role: memberData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setTeamMembers(
          teamMembers.map((member) =>
            member._id === memberToEdit ? result.data : member
          )
        );

        setMemberData({ fullName: "", phone: "", email: "", role: "Member" });
        setShowEditModal(false);
        setMemberToEdit(null);

        console.log("Team member updated successfully");
        return true;
      } else {
        throw new Error(result.message || "Failed to update team member");
      }
    } catch (err) {
      console.error("Error updating team member:", err);
    }
  };

  const updateSetting = (field, value) => {
    setChatbotSettings((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const updateFormData = (field, value) => {
    setChatbotSettings((prevState) => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        [field]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    try {
      const response = await axios.put(
        `${url}/chatbot-setting/update-chat-setting`,
        chatbotSettings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedSettings = response.data;
      console.log("Settings successfully updated:", updatedSettings);
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const getSettingsFromDatabase = async () => {
    try {
      const response = await axios.get(
        `${url}/chatbot-setting/get-chat-setting`
      );
      const settings = response.data;

      setChatbotSettings((prevSettings) => ({
        ...prevSettings,
        ...settings,
        formData: {
          ...prevSettings.formData,
          ...settings.formData,
        },
      }));
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleFormDataChange = (field, value) => {
    setChatbotSettings((prevSettings) => ({
      ...prevSettings,
      formData: {
        ...prevSettings.formData,
        [field]: value,
      },
    }));
  };

  const handleWelcomeBubbleChange = (value) => {
    setChatbotSettings((prev) => ({
      ...prev,
      welcomeBubbleText: value,
    }));
  };

  const handleTimerChange = (field, value) => {
    setChatbotSettings((prev) => ({
      ...prev,
      missedChatTimer: {
        ...prev.missedChatTimer,
        [field]: value,
      },
    }));
  };

  const handleMouseEnter = () => {
    if (!showChatbot) {
      setShowWelcomeBubble(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showChatbot) {
      setShowWelcomeBubble(false);
    }
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    setShowWelcomeBubble(false);
    handleFetchMeassages();
  };

  const closeWelcomeBubble = (e) => {
    e.stopPropagation();
    setShowWelcomeBubble(false);
  };

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${url}/chat/getAllChats/${adminDetails.id}`);
      setChats(res.data);
      if (selectedChat) {
        const updatedSelectedChat = res.data.find(
          (chat) => chat._id === selectedChat._id
        );
        if (updatedSelectedChat) {
          setSelectedChat(updatedSelectedChat);
        }
      }
    } catch (err) {
      console.error("Error fetching chats", err);
    }
  };

  const handleChatClick = async (chat) => {
    setSelectedChat(chat);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setStatusOpen(false);
  };

  const toggleStatusDropdown = () => {
    setStatusOpen(!statusOpen);
    setIsOpen(false);
  };

  const handleTeamMemberSelect = (member) => {
    setPendingTeamMember(member);
    setTeamWarningVisible(true);
    setIsOpen(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    if (status === "resolved" && selectedStatus !== "resolved") {
      setStatusWarningVisible(true);
    } else {
      setSelectedStatus(status);
    }
    setStatusOpen(false);
  };

  const confirmTeamChange = async () => {
    if (!selectedChat || !pendingTeamMember) return;

    const res = await assignChat(
      selectedChat._id,
      pendingTeamMember._id,
      token
    );
    if (!res.error) {
      selectedChat.assigned = pendingTeamMember._id;
      setUser({ name: pendingTeamMember.fullName });
    } else {
      alert(res.error);
    }
    setTeamWarningVisible(false);
  };

  const confirmStatusChange = async () => {
    if (!selectedChat || !selectedStatus) return;

    const res = await changeStatus(
      selectedChat._id,
      selectedStatus.toLowerCase(),
      token
    );
    if (!res.error) {
      selectedChat.status = selectedStatus;
    } else {
      alert(res.error);
    }

    setStatusWarningVisible(false);
    setStatusWarningVisible(false);
  };

  const assignChat = async (chatId, newAssigneeId, token) => {
    try {
      const res = await axios.put(
        `${url}/chat/${chatId}/assign`,
        { newAssigneeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      console.error("Error assigning chat:", err);
      return { error: err.response?.data?.error || "Something went wrong" };
    }
  };

  const changeStatus = async (chatId, status, token) => {
    console.log(status);
    try {
      const res = await axios.put(
        `${url}/chat/${chatId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      console.error("Error changing status:", err);
      return { error: err.response?.data?.error || "Something went wrong" };
    }
  };

  const sendMessage = async (chatId, content, senderType, senderName) => {
    try {
      console.log("token-", chatId);
      const res = await axios.post(`${url}/chat/sendMessage/${chatId}`, {
        content,
        senderType,
        senderName,
      });
      handleFetchMeassages();
      return res.data;
    } catch (err) {
      console.error("Error sending message:", err);
      return { error: err.response?.data?.error || "Something went wrong" };
    }
  };

  const handleSendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const response = await sendMessage(
        selectedChat._id,
        newMsg,
        "admin",
        `${adminDetails.firstName} ${adminDetails.lastName}`
      );
      setNewMsg("");
      getMessages();
      if (response.newMessage) {
        selectedChat.messages.push(response.newMessage);
      } else {
        alert(response.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getMessages = async () => {
    if (selectedChat) {
      const fetchedMessages = await fetchMessages(selectedChat._id, token);
      setMessages(fetchedMessages);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`${url}/chat/fetchMessages/${chatId}`);
      return res.data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const date = formatDate(message.timestamp);
    if (!acc[date]) acc[date] = [];
    acc[date].push(message);
    return acc;
  }, {});

  const handleFetchMeassages = async () => {
    const messages = await fetchMessages(savedChatId);
    setNewChatMessages(messages);
  };

  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCreateChat = async () => {
    try {
      if (!createFormData.name || !createFormData.email) {
        alert("Name and email are required!");
        return;
      }

      const response = await axios.post(
        `${url}/chat/createChat`,
        createFormData
      );
      if (response.status === 201) {
        console.log("Chat created successfully:", response.data.chat);
        setChatCreated(true);
        setNewChatId(response.data.chat._id);
        localStorage.setItem("createFormData", JSON.stringify(createFormData));
        localStorage.setItem("newChatId", response.data.chat._id);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    }
  };

  const handleUserSendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      console.log("a=", savedChatId, newMsg, "user", createFormData.name);
      const response = await sendMessage(
        savedChatId,
        newMsg,
        "user",
        createFormData.name
      );
      setNewMsg("");
      if (response.newMessage) {
        selectedChat.messages.push(response.newMessage);
      } else {
        alert(response.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const checkChatID = () => {
    setSavedChatId(localStorage.getItem("newChatId"));
    const form = localStorage.getItem("createFormData");
    if (form) {
      setCreateFormData(JSON.parse(form));
    }
  };

  const retrieveChats = async () => {
    try {
      const response = await axios.get(`${url}/chat/retrieveChats`);
      if (response.data.success) {
        setTickets(response.data.chats);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchSingleChat = async (chatId) => {
    try {
      const response = await axios.get(`${url}/chat/fetchSingleChat/${chatId}`);
      if (response.data.success) {
        console.log(response.data);
        setSelectedChat(response.data.chat);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getAssigneeNameById = async (id) => {
    try {
      try {
        const teamResponse = await axios.get(`${url}/member/memberName/${id}`);
        if (teamResponse.data && teamResponse.data.name) {
          return teamResponse.data.name;
        }
      } catch (teamErr) {}

      const adminResponse = await axios.get(`${url}/admin/adminName/${id}`);

      if (adminResponse.data && adminResponse.data.name) {
        return adminResponse.data.name;
      }

      console.error("No name found for ID:", id);
      return null;
    } catch (error) {
      console.error(
        "Error finding assignee name:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  const contextValue = {
    token,
    loginData,
    registerData,
    isLogin,
    showTooltip,
    adminDetails,
    teamMembers,
    handleAddMember,
    handleDeleteClick,
    handleEditClick,
    handleUpdateMember,
    handleInputChange,
    confirmDelete,
    setTeamMembers,
    setShowTooltip,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    showDeleteModal,
    setShowDeleteModal,
    memberData,
    setMemberData,
    toggleForm,
    handleLoginChange,
    handleLoginSubmit,
    handleRegisterChange,
    handleRegisterSubmit,
    handleUpdate,
    handleUpdateSubmit,
    updateSetting,
    updateFormData,
    chatbotSettings,
    setChatbotSettings,
    handleSaveSettings,
    handleFormDataChange,
    handleWelcomeBubbleChange,
    handleTimerChange,
    showWelcomeBubble,
    showChatbot,
    handleMouseEnter,
    handleMouseLeave,
    toggleChatbot,
    closeWelcomeBubble,
    chats,
    selectedChat,
    setSelectedChat,
    handleChatClick,
    isOpen,
    statusOpen,
    selectedStatus,
    user,
    teamWarningVisible,
    setTeamWarningVisible,
    statusWarningVisible,
    setStatusWarningVisible,
    pendingTeamMember,
    toggleDropdown,
    toggleStatusDropdown,
    handleTeamMemberSelect,
    handleStatusSelect,
    confirmTeamChange,
    confirmStatusChange,
    newMsg,
    setNewMsg,
    handleSendMessage,
    formatDate,
    messages,
    setMessages,
    groupedMessages,
    createFormData,
    setCreateFormData,
    chatCreated,
    setChatCreated,
    handleCreateFormChange,
    handleCreateChat,
    handleUserSendMessage,
    savedChatId,
    newchatMessages,
    tickets,
    averageReplyTime,
    resolvedCount,
    totalElapsedTime,
    totalTickets,
    missedChatsData,
    fetchSingleChat,
    getAssigneeNameById,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
