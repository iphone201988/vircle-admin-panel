import React, { useState } from 'react';
import { Upload, User, Save, RotateCcw, Clock, Heart, Settings, Plus, X, Edit, Trash2 } from 'lucide-react';


const initialFormData = {
    type: '',
    name: '',
    age: '',
    gender: '',
    relationship: '',
    expertise: '',
    characteristics: '',
    canTextEvery: '',
    on: '',
    at: '',
    whatDoYouWantToHear: '',
    aiAvatar: null,
    isActive: true,
};

const AI_CONTACT_TYPES = [
    { value: 'new_companion', label: 'New Companion' },
    { value: 'new_assistant', label: 'New Assistant' },
    { value: 'new_expert', label: 'New Expert' },
    { value: 'new_characters', label: 'New Characters' },
];

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
const TEXT_FREQUENCY = ['Day', 'Week', 'Month'];
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AiContactForm = ({ onSubmit, isLoading = false, error, success, onClose }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [activeTab, setActiveTab] = useState('basic');

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
        if (!formData.type) errors.type = 'Contact type is required';
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.age.trim()) errors.age = 'Age is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.canTextEvery) errors.canTextEvery = 'Text frequency is required';
        if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) <= 0)) {
            errors.age = 'Please enter a valid age';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setAvatarPreview(null);
        setFormErrors({});
        setActiveTab('basic');
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Create AI Contact</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-base border border-red-200">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg text-base border border-green-200">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Section */}
                        <div className="text-center">
                            <div className="relative w-28 h-28 mx-auto mb-4">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                        <User size={48} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer inline-flex items-center px-5 py-2.5 bg-[#1976d2] text-white rounded-lg hover:bg-[#1565c0] transition-colors duration-200 text-base font-medium shadow-md">
                                <Upload size={18} className="mr-2" />
                                Upload Avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                            {formData.aiAvatar && (
                                <p className="mt-3 text-sm text-gray-600 truncate max-w-xs mx-auto">{formData.aiAvatar.name}</p>
                            )}
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex bg-gray-100 rounded-lg overflow-hidden p-1.5">
                            <button
                                type="button"
                                onClick={() => setActiveTab('basic')}
                                className={`flex-1 py-3 text-base font-medium flex items-center justify-center transition-colors rounded-md ${activeTab === 'basic' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                <User size={18} className="mr-2" />
                                Basic Info
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('communication')}
                                className={`flex-1 py-3 text-base font-medium flex items-center justify-center transition-colors rounded-md ${activeTab === 'communication' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                            >
                                <Clock size={18} className="mr-2" />
                                Schedule
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            {activeTab === 'basic' ? (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Type *</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => handleInputChange('type', e.target.value)}
                                                className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.type ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                            >
                                                <option value="">Select Type</option>
                                                {AI_CONTACT_TYPES.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.type && (
                                                <p className="text-sm text-red-500 mt-1.5">{formErrors.type}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                                    placeholder="Enter name"
                                                />
                                                {formErrors.name && (
                                                    <p className="text-sm text-red-500 mt-1.5">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age *</label>
                                                <input
                                                    type="number"
                                                    value={formData.age}
                                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                                    className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.age ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                                    placeholder="Age"
                                                    min="1"
                                                    max="120"
                                                />
                                                {formErrors.age && (
                                                    <p className="text-sm text-red-500 mt-1.5">{formErrors.age}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
                                            <select
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.gender ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                            >
                                                <option value="">Select Gender</option>
                                                {GENDER_OPTIONS.map((gender) => (
                                                    <option key={gender} value={gender}>
                                                        {gender}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.gender && (
                                                <p className="text-sm text-red-500 mt-1.5">{formErrors.gender}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Relationship</label>
                                                <select
                                                    value={formData.relationship}
                                                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                >
                                                    <option value="">Select Relationship</option>
                                                    <option value="No Relationship">No Relationship</option>
                                                    <option value="Friend">Friend</option>
                                                    <option value="Boyfriend">Boyfriend</option>
                                                    <option value="Girlfriend">Girlfriend</option>
                                                    <option value="Stranger">Stranger</option>
                                                    <option value="New acquaintance">New acquaintance</option>
                                                    <option value="Husband">Husband</option>
                                                    <option value="Wife">Wife</option>
                                                    <option value="Mentor">Mentor</option>
                                                    <option value="Coach">Coach</option>
                                                    <option value="Personal Assistant">Personal Assistant</option>
                                                    <option value="Dad">Dad</option>
                                                    <option value="Mother">Mother</option>
                                                    <option value="Teacher">Teacher</option>
                                                    <option value="Manager">Manager</option>
                                                </select>
                                            </div>



                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expertise</label>
                                                <select
                                                    value={formData.expertise}
                                                    onChange={(e) => handleInputChange('expertise', e.target.value)}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                >
                                                    <option value="">Select Expertise</option>
                                                    <option value="No Expertise">No Expertise</option>
                                                    <option value="Wellness Coach">Wellness Coach</option>
                                                    <option value="Fitness Trainer">Fitness Trainer</option>
                                                    <option value="Nutrition Guide">Nutrition Guide</option>
                                                    <option value="Career Mentor">Career Mentor</option>
                                                    <option value="Business Advisor">Business Advisor</option>
                                                    <option value="Study Buddy">Study Buddy</option>
                                                    <option value="Language Partner">Language Partner</option>
                                                    <option value="Math Tutor">Math Tutor</option>
                                                    <option value="Cooking Expert">Cooking Expert</option>
                                                    <option value="Science Tutor">Science Tutor</option>
                                                    <option value="Writing Coach">Writing Coach</option>
                                                    <option value="Emotional Support">Emotional Support</option>
                                                    <option value="Life Listener">Life Listener</option>
                                                    <option value="Organizer">Organizer</option>
                                                    <option value="Productivity Assistant">Productivity Assistant</option>
                                                    <option value="Financial Guide">Financial Guide</option>
                                                    <option value="Tech Support">Tech Support</option>
                                                    <option value="Travel Planner">Travel Planner</option>
                                                    <option value="Fashion Stylist">Fashion Stylist</option>
                                                    <option value="News Curator">News Curator</option>
                                                    <option value="Legal Info Helper">Legal Info Helper</option>
                                                    <option value="Health Information">Health Information</option>
                                                    <option value="Creativity Coach">Creativity Coach</option>
                                                    <option value="History Expert">History Expert</option>
                                                    <option value="Parenting Advisor">Parenting Advisor</option>
                                                    <option value="Movie Geek">Movie Geek</option>
                                                    <option value="Music Enthusiast">Music Enthusiast</option>
                                                    <option value="Art Critic">Art Critic</option>
                                                    <option value="Bookworm">Bookworm</option>
                                                    <option value="Theatre Enthusiast">Theatre Enthusiast</option>
                                                    <option value="Dance Guide">Dance Guide</option>
                                                    <option value="Wild Curiosities Explorer">Wild Curiosities Explorer</option>
                                                    <option value="Museum Guide">Museum Guide</option>
                                                    <option value="History Aficionado">History Aficionado</option>
                                                    <option value="Photography Mentor">Photography Mentor</option>
                                                    <option value="Local Finder">Local Finder</option>
                                                </select>
                                            </div>




                                        </div>
                                    </div>




                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Characteristics</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                placeholder="Add new characteristic..."
                                                className="flex-1 p-2 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                                            >
                                                <Plus size={16} className="mr-1" />
                                                Add
                                            </button>
                                        </div>
                                        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg p-2">
                                            {[
                                                "Adaptable", "Adventurous", "Affectionate", "Agreeable", "Ambitious", "Amiable", "Analytical",
                                                "Appreciative", "Assertive", "Attentive", "Balanced", "Bold", "Calm", "Caring", "Cautious",
                                                "Charismatic", "Charming", "Cheerful", "Compassionate", "Confident", "Conscientious", "Considerate",
                                                "Consistent", "Constructive", "Cooperative", "Courageous", "Courteous", "Creative", "Curious",
                                                "Daring", "Decisive", "Dedicated", "Dependable", "Determined", "Diligent", "Diplomatic",
                                                "Disciplined", "Discreet", "Dynamic", "Easygoing", "Efficient", "Empathetic", "Energetic",
                                                "Enthusiastic", "Ethical", "Even-tempered", "Experienced", "Fair", "Flexible", "Focused",
                                                "Friendly", "Frugal", "Fun-loving", "Funny", "Generous", "Gentle", "Genuine", "Good-natured",
                                                "Gracious", "Hardworking", "Helpful", "Honest", "Hopeful", "Humble", "Humorous", "Imaginative",
                                                "Independent", "Innovative", "Insightful", "Intelligent", "Intuitive", "Inventive", "Joyful",
                                                "Kind", "Knowledgeable", "Logical", "Loyal", "Mature", "Meticulous", "Motivated", "Objective",
                                                "Observant", "Open-minded", "Optimistic", "Organized", "Outgoing", "Patient", "Perceptive",
                                                "Persistent", "Persuasive", "Pleasant", "Practical", "Proactive", "Productive", "Protective",
                                                "Punctual", "Rational", "Realistic", "Reflective", "Reliable", "Respectful"
                                            ].map((characteristic) => (
                                                <div key={characteristic} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                                                    <span>{characteristic}</span>
                                                    <div className="flex gap-1">
                                                        <button
                                                            type="button"
                                                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ) : (
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Text Frequency *</label>
                                        <select
                                            value={formData.canTextEvery}
                                            onChange={(e) => handleInputChange('canTextEvery', e.target.value)}
                                            className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.canTextEvery ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                        >
                                            <option value="">Select Frequency</option>
                                            {TEXT_FREQUENCY.map((freq) => (
                                                <option key={freq} value={freq}>
                                                    Every {freq}
                                                </option>
                                            ))}
                                        </select>
                                        {formErrors.canTextEvery && (
                                            <p className="text-sm text-red-500 mt-1.5">{formErrors.canTextEvery}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">




                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">On</label>
                                            {formData.canTextEvery === 'Day' ? (
                                                <div className="w-full p-3.5 text-base bg-gray-100 rounded-lg border border-gray-300 text-gray-500">
                                                    Not applicable for daily frequency
                                                </div>
                                            ) : (
                                                <select
                                                    value={formData.on}
                                                    onChange={(e) => handleInputChange('on', e.target.value)}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                >
                                                    <option value="">Select {formData.canTextEvery === 'Week' ? 'Day of Week' : formData.canTextEvery === 'Month' ? 'Day of Month' : 'Option'}</option>

                                                    {formData.canTextEvery === 'Week' && (
                                                        <>
                                                            <option value="Random">Random</option>
                                                            <option value="Monday">Monday</option>
                                                            <option value="Tuesday">Tuesday</option>
                                                            <option value="Wednesday">Wednesday</option>
                                                            <option value="Thursday">Thursday</option>
                                                            <option value="Friday">Friday</option>
                                                            <option value="Saturday">Saturday</option>
                                                            <option value="Sunday">Sunday</option>
                                                        </>
                                                    )}

                                                    {formData.canTextEvery === 'Month' && (
                                                        <>
                                                            <option value="Random">Random</option>
                                                            <option value="1st">1st</option>
                                                            <option value="2nd">2nd</option>
                                                            <option value="3rd">3rd</option>
                                                            <option value="4th">4th</option>
                                                            <option value="5th">5th</option>
                                                            <option value="6th">6th</option>
                                                            <option value="7th">7th</option>
                                                            <option value="8th">8th</option>
                                                            <option value="9th">9th</option>
                                                            <option value="10th">10th</option>
                                                            <option value="11th">11th</option>
                                                            <option value="12th">12th</option>
                                                            <option value="13th">13th</option>
                                                            <option value="14th">14th</option>
                                                            <option value="15th">15th</option>
                                                            <option value="16th">16th</option>
                                                            <option value="17th">17th</option>
                                                            <option value="18th">18th</option>
                                                            <option value="19th">19th</option>
                                                            <option value="20th">20th</option>
                                                            <option value="21st">21st</option>
                                                            <option value="22nd">22nd</option>
                                                            <option value="23rd">23rd</option>
                                                            <option value="24th">24th</option>
                                                            <option value="25th">25th</option>
                                                            <option value="26th">26th</option>
                                                            <option value="27th">27th</option>
                                                            <option value="28th">28th</option>
                                                            <option value="29th">29th</option>
                                                            <option value="30th">30th</option>
                                                            <option value="Last day of month">Last day of month</option>
                                                        </>
                                                    )}
                                                </select>
                                            )}
                                        </div>


                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Time</label>
                                            <input
                                                type="time"
                                                value={formData.at}
                                                onChange={(e) => handleInputChange('at', e.target.value)}
                                                className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    </div>



                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">What do you want to hear?</label>
                                        <select
                                            value={formData.whatDoYouWantToHear}
                                            onChange={(e) => handleInputChange('whatDoYouWantToHear', e.target.value)}
                                            className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        >
                                            <option value="">Select what you want to hear</option>
                                            <option value="Random Message">Random Message</option>
                                            <option value="Greeting">Greeting</option>
                                            <option value="Daily News">Daily News</option>
                                            <option value="Weekly News">Weekly News</option>
                                            <option value="Daily Motivation">Daily Motivation</option>
                                            <option value="Mood Boosters">Mood Boosters</option>
                                            <option value="Inspirational Quotes">Inspirational Quotes</option>
                                            <option value="Check-in on Recent Events">Check-in on Recent Events</option>
                                            <option value="Wellness Check-ins">Wellness Check-ins</option>
                                            <option value="Dietary Reminders">Dietary Reminders</option>
                                            <option value="Water Consumption Reminder">Water Consumption Reminder</option>
                                            <option value="Meditation Reminder">Meditation Reminder</option>
                                            <option value="Stretching Reminder">Stretching Reminder</option>
                                            <option value="Fun Facts">Fun Facts</option>
                                            <option value="Weather Forecast">Weather Forecast</option>
                                            <option value="Movie Recommendations">Movie Recommendations</option>
                                            <option value="Book Suggestions">Book Suggestions</option>
                                            <option value="Study Tips">Study Tips</option>
                                            <option value="Jokes">Jokes</option>
                                            <option value="Role Playing">Role Playing</option>
                                            <option value="Language Practise">Language Practise</option>
                                            <option value="Cooking Recipes">Cooking Recipes</option>
                                        </select>
                                    </div>




                                </div>
                            )}
                        </div>

                        {/* Status */}
                        {/* <div className="flex items-center justify-center py-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-base font-medium text-gray-700 flex items-center">
                                    <Heart
                                        size={18}
                                        className={`mr-2 ${formData.isActive ? 'text-blue-600' : 'text-gray-400'}`}
                                    />
                                    Active Contact
                                </span>
                            </label>
                        </div> */}

                        {/* Action Buttons */}
                        <div className="flex gap-5 pt-5">
                            <button
                                type="button"
                                onClick={handleReset}
                                disabled={isLoading}
                                className="flex-1 px-5 py-3.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-sm"
                            >
                                <RotateCcw size={18} className="mr-2" />
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-2 px-5 py-3.5 bg-[#1976d2] text-white rounded-lg hover:bg-[#1565c0] transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-md"
                            >
                                {isLoading ? (
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
                                {isLoading ? 'Creating...' : 'Create Contact'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [showAiContactForm, setShowAiContactForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (formData) => {
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would send the data to your backend here
            console.log('Form submitted:', formData);

            setSuccess('AI Contact created successfully!');
            setTimeout(() => {
                setShowAiContactForm(false);
                setSuccess('');
            }, 2000);
        } catch (err) {
            setError('Failed to create AI Contact. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <Settings className="mr-3" />
                        Settings
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your application settings and preferences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Account Settings Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Profile Information</h3>
                                <p className="text-sm text-gray-600 mt-1">Update your personal information</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Security</h3>
                                <p className="text-sm text-gray-600 mt-1">Change password and security settings</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Notifications</h3>
                                <p className="text-sm text-gray-600 mt-1">Manage your notification preferences</p>
                            </div>
                        </div>
                    </div>

                    {/* Application Settings Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Settings</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Display</h3>
                                <p className="text-sm text-gray-600 mt-1">Theme and appearance settings</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Language</h3>
                                <p className="text-sm text-gray-600 mt-1">App language and region settings</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-700">Privacy</h3>
                                <p className="text-sm text-gray-600 mt-1">Data and privacy controls</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Contacts Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 md:col-span-2">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">AI Contacts</h2>
                            <button
                                onClick={() => setShowAiContactForm(true)}
                                className="flex items-center px-4 py-2 bg-[#1976d2] text-white rounded-lg hover:bg-[#1565c0] transition-colors"
                            >
                                <Plus size={18} className="mr-2" />
                                Create AI Contact
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                            <User className="mx-auto text-gray-400 mb-3" size={40} />
                            <h3 className="font-medium text-gray-700 mb-1">No AI Contacts Yet</h3>
                            <p className="text-gray-600 text-sm mb-4">Create your first AI contact to get started</p>
                            <button
                                onClick={() => setShowAiContactForm(true)}
                                className="inline-flex items-center px-4 py-2 bg-[#1976d2] text-white rounded-lg hover:bg-[#1565c0] transition-colors"
                            >
                                <Plus size={16} className="mr-2" />
                                Create AI Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Contact Form Modal */}
            {showAiContactForm && (
                <AiContactForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    error={error}
                    success={success}
                    onClose={() => setShowAiContactForm(false)}
                />
            )}
        </div>
    );
};

export default SettingsPage;

