import React, { useContext, useState } from "react";
import "./Team.css";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Context/AdminContext";
import BackDrop from "../BackDrop/BackDrop";

const Team = () => {
  const {
    teamMembers,
    showDeleteModal,
    setShowDeleteModal,
    showAddModal,
    setShowAddModal,
    showEditModal,
    setShowEditModal,
    handleAddMember,
    handleDeleteClick,
    handleEditClick,
    handleUpdateMember,
    handleInputChange,
    confirmDelete,
    memberData,
    setMemberData,
  } = useContext(AdminContext);

  return (
    <div className="team-container">
      <div className="team-header">
        <h2>Team</h2>
      </div>

      <div className="team-table">
        <div className="table-header">
          <div className="header-cell member-avatar"></div>
          <div className="header-cell full-name">
            Full Name <span className="sort-icon">↓</span>
          </div>
          <div className="header-cell phone">Phone</div>
          <div className="header-cell email">Email</div>
          <div className="header-cell role">Role</div>
          <div className="header-cell actions"></div>
        </div>

        <div className="table-body">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div className="table-row" key={member._id}>
                <div className="table-cell member-avatar">
                  <div
                    className="avatar-circle"
                    style={{ backgroundImage: `url(${assets.john})` }}
                  ></div>
                </div>
                <div className="table-cell full-name">{member.fullName}</div>
                <div className="table-cell phone">{member.phone}</div>
                <div className="table-cell email">{member.email}</div>
                <div className="table-cell role">{member.role}</div>
                <div className="table-cell actions">
                  {member.role !== "Admin" && (
                    <>
                      <button
                        className="action-button edit-button"
                        onClick={() => handleEditClick(member)}
                      >
                        <span className="edit-icon">
                          <img src={assets.edit_btn} alt="Edit" />
                        </span>
                      </button>
                      <button
                        className="action-button delete-button"
                        onClick={() => handleDeleteClick(member._id)}
                      >
                        <span className="delete-icon">
                          <img src={assets.remove} alt="Delete" />
                        </span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">No team members found</div>
          )}
        </div>
      </div>

      <div className="team-actions">
        <button
          className="add-member-button"
          onClick={() => setShowAddModal(true)}
        >
          ⊕ Add Team members
        </button>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-content">
              <p>This teammate will be deleted.</p>
              <div className="modal-actions">
                <button
                  className="cancel-button"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="confirm-button" onClick={confirmDelete}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal add-modal">
            <div className="modal-header">
              <h3>Add Team members</h3>
              <p className="modal-description">
                Talk with colleagues in a group chat. Messages in this group are
                only visible to its participants. New teammates may only be
                invited by the administrators.
              </p>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={memberData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={memberData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email ID</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={memberData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Designation</label>
                <select
                  id="role"
                  name="role"
                  value={memberData.role}
                  onChange={handleInputChange}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-actions edit-modal-actions ">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowAddModal(false);
                  setMemberData({
                    fullName: "",
                    phone: "",
                    email: "",
                    role: "Member",
                  });
                }}
              >
                Cancel
              </button>
              <button className="save-button" onClick={handleAddMember}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal edit-modal">
            <div className="modal-header">
              <h3>Edit Team Member</h3>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="edit-fullName">Full Name</label>
                <input
                  type="text"
                  id="edit-fullName"
                  name="fullName"
                  value={memberData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-phone">Phone</label>
                <input
                  type="tel"
                  id="edit-phone"
                  name="phone"
                  value={memberData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-email">Email ID</label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={memberData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-role">Designation</label>
                <select
                  id="edit-role"
                  name="role"
                  value={memberData.role}
                  onChange={handleInputChange}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="modal-actions edit-modal-actions">
              <button
                className="cancel-button"
                onClick={() => {
                  setShowEditModal(false);
                  setMemberToEdit(null);
                  setMemberData({
                    fullName: "",
                    phone: "",
                    email: "",
                    role: "Member",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="save-button update-btn"
                onClick={handleUpdateMember}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      <BackDrop />
    </div>
  );
};

export default Team;
