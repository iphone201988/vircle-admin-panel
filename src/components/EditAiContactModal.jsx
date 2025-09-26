import { useEffect, useState } from "react";
import { X, Save, User, Upload } from "lucide-react";
import { useUpdateAdminAiContactMutation } from "../rtk/api/adminApi";
import toast from "react-hot-toast";
import Loader from "./Loader";

function EditAiContactModal({ open, onClose, contact, onUpdate }) {
  const [formData, setFormData] = useState(contact || {});
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(contact?.aiAvatar || null);
  const [formErrors, setFormErrors] = useState({});
  const [updateAdminAiContact] = useUpdateAdminAiContactMutation();

  useEffect(() => {
    setFormData(contact || {});
    setAvatarPreview(contact?.aiAvatar || null);
    setFormErrors({});
  }, [contact]);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, aiAvatar: file }));
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Name is required';
    if (!formData.age?.toString().trim()) errors.age = 'Age is required';
    if (!formData.gender?.trim()) errors.gender = 'Gender is required';
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) <= 0)) {
      errors.age = 'Please enter a valid age';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const form = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'aiAvatar' && formData[key] instanceof File) {
          form.append('aiAvatar', formData[key]);
        } else if (key !== 'aiAvatar' && formData[key] !== undefined && formData[key] !== null) {
          form.append(key, formData[key]);
        }
      });

      await updateAdminAiContact({ formData: form, id: formData._id || formData.id }).unwrap();
      onUpdate && onUpdate();
      toast.success("Contact updated successfully!");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 scrollbar-hide">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit AI Contact</h2>
                <p className="text-sm text-gray-500">Update contact information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className=" w-24 h-24 mx-auto mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                    <User size={36} className="text-gray-400" />
                  </div>
                )}
              </div>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md">
                <Upload size={16} className="mr-2" />
                Update Avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            {/* Form Fields */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={handleChange("name")}
                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${
                      formErrors.name 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:ring-4 focus:outline-none`}
                    placeholder="Enter contact name"
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={formData.age || ""}
                    onChange={handleChange("age")}
                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${
                      formErrors.age 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:ring-4 focus:outline-none`}
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                  {formErrors.age && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.age}</p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.gender || ""}
                    onChange={handleChange("gender")}
                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${
                      formErrors.gender 
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                    } focus:ring-4 focus:outline-none`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {formErrors.gender && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.gender}</p>
                  )}
                </div>

                {/* Relationship */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    value={formData.relationship || ""}
                    onChange={handleChange("relationship")}
                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="e.g., Friend, Mentor, Coach"
                  />
                </div>

                {/* Expertise */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise</label>
                  <input
                    type="text"
                    value={formData.expertise || ""}
                    onChange={handleChange("expertise")}
                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="e.g., Fitness Trainer, Career Mentor"
                  />
                </div>

                {/* Language Preference */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Language Preference</label>
                  <input
                    type="text"
                    value={formData.languagePreference || ""}
                    onChange={handleChange("languagePreference")}
                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                    placeholder="Preferred language for communication"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description || ""}
                    onChange={handleChange("description")}
                    rows={4}
                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none resize-none"
                    placeholder="Describe the AI contact's personality and characteristics..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-md"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                    />
                  </svg>
                ) : (
                  <Save size={18} className="mr-2" />
                )}
                {loading ? 'Updating...' : 'Update Contact'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditAiContactModal;







