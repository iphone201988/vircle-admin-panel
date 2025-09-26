import React, { useMemo, useState } from 'react';
import { Upload, User, Save, RotateCcw, Settings, Plus, X, Trash2, Edit } from 'lucide-react';
import { useAddAdminAiContactMutation, useGetElementsQuery, useGetAdminAiContactsQuery, useDeleteAdminAiContactMutation, useUpdateAdminAiContactMutation, useEditElementsMutation } from '../../rtk/api/adminApi';
import EditAiContactModal from '../../components/EditAiContactModal.jsx';


const initialFormData = {
    type: '',
    title: '',
    subTitle: '',
    name: '',
    age: '',
    gender: '',
    relationship: '',
    expertise: '',
    characterstics: [],
    canTextEvery: '',
    on: '',
    at: '',
    wantToHear: '',
    aiAvatar: null,
    isActive: true,
};

const DEFAULT_TYPES = [
    { value: 'new_companion', label: 'New Companion' },
    { value: 'new_assistant', label: 'New Assistant' },
    { value: 'new_expert', label: 'New Expert' },
    { value: 'new_characters', label: 'New Characters' },
];

const DEFAULT_GENDERS = ['Male', 'Female', 'Other'];
const TEXT_FREQUENCY = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' },
    { value: 'Never', label: 'No schedule' },
];

const AiContactForm = ({ onSubmit, isSubmitting = false, error, success, onClose }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const { data: elementsData, isLoading: isElementsLoading, isError: isElementsError } = useGetElementsQuery();

    const elements = elementsData?.data || elementsData || {};
    const typeOptions = useMemo(() => {
        const types = elements.types || elements.typeOptions || elements.contactTypes;
        if (Array.isArray(types)) {
            return types.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));
        }
        return DEFAULT_TYPES;
    }, [elements]);

    const genderOptions = useMemo(() => {
        const genders = elements.genders || elements.genderOptions;
        return Array.isArray(genders) && genders.length ? genders : DEFAULT_GENDERS;
    }, [elements]);

    const relationshipOptions = useMemo(() => {
      console.log('elements==========', elements?.elements);
        const rel = elements?.elements?.relationships || elements.relationshipOptions || elements.relationship;
        
        return Array.isArray(rel) && rel.length ? rel : [
            'No Relationship','Friend','Boyfriend','Girlfriend','Stranger','New acquaintance','Husband','Wife','Mentor','Coach','Personal Assistant','Dad','Mother','Teacher','Manager'
        ];
    }, [elements]);

    const expertiseOptions = useMemo(() => {
        const exp = elements?.elements?.experties || elements.expertiseOptions || elements.expertise;
        return Array.isArray(exp) && exp.length ? exp : [
            'No Expertise','Wellness Coach','Fitness Trainer','Nutrition Guide','Career Mentor','Business Advisor','Study Buddy','Language Partner','Math Tutor','Cooking Expert','Science Tutor','Writing Coach','Emotional Support','Life Listener','Organizer','Productivity Assistant','Financial Guide','Tech Support','Travel Planner','Fashion Stylist','News Curator','Legal Info Helper','Health Information','Creativity Coach','History Expert','Parenting Advisor','Movie Geek','Music Enthusiast','Art Critic','Bookworm','Theatre Enthusiast','Dance Guide','Wild Curiosities Explorer','Museum Guide','History Aficionado','Photography Mentor','Local Finder'
        ];
    }, [elements]);

    const wantToHearOptions = useMemo(() => {
        const wth = elements?.elements?.whatYouWantToHear || elements.wantToHearOptions || elements.whatDoYouWantToHear;
        return Array.isArray(wth) && wth.length ? wth : [
            'Random Message','Greeting','Daily News','Weekly News','Daily Motivation','Mood Boosters','Inspirational Quotes','Check-in on Recent Events','Wellness Check-ins','Dietary Reminders','Water Consumption Reminder','Meditation Reminder','Stretching Reminder','Fun Facts','Weather Forecast','Movie Recommendations','Book Suggestions','Study Tips','Jokes','Role Playing','Language Practise','Cooking Recipes'
        ];
    }, [elements]);

    const characteristicOptions = useMemo(() => {
        const chars = elements?.elements?.characteristics || elements.charactersticsOptions;
        return Array.isArray(chars) && chars.length ? chars : [
            'Adaptable','Adventurous','Affectionate','Agreeable','Ambitious','Amiable','Analytical','Appreciative','Assertive','Attentive','Balanced','Bold','Calm','Caring','Cautious','Charismatic','Charming','Cheerful','Compassionate','Confident','Conscientious','Considerate','Consistent','Constructive','Cooperative','Courageous','Courteous','Creative','Curious','Daring','Decisive','Dedicated','Dependable','Determined','Diligent','Diplomatic','Disciplined','Discreet','Dynamic','Easygoing','Efficient','Empathetic','Energetic','Enthusiastic','Ethical','Even-tempered','Experienced','Fair','Flexible','Focused','Friendly','Frugal','Fun-loving','Funny','Generous','Gentle','Genuine','Good-natured','Gracious','Hardworking','Helpful','Honest','Hopeful','Humble','Humorous','Imaginative','Independent','Innovative','Insightful','Intelligent','Intuitive','Inventive','Joyful','Kind','Knowledgeable','Logical','Loyal','Mature','Meticulous','Motivated','Objective','Observant','Open-minded','Optimistic','Organized','Outgoing','Patient','Perceptive','Persistent','Persuasive','Pleasant','Practical','Proactive','Productive','Protective','Punctual','Rational','Realistic','Reflective','Reliable','Respectful'
        ];
    }, [elements]);

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
        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.age.trim()) errors.age = 'Age is required';
        if (!formData.gender) errors.gender = 'Gender is required';
        if (!formData.canTextEvery) errors.canTextEvery = 'Text frequency is required';
        if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) <= 0)) {
            errors.age = 'Please enter a valid age';
        }
        if (!Array.isArray(formData.characterstics)) {
            errors.characterstics = 'characterstics must be an array';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 scrollbar-hide">
                <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Create AI Contact</h2>
                            <p className="text-sm text-gray-500">Add a new AI companion to your contacts</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
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
                    {isElementsError && (
                        <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-lg text-base border border-yellow-200">
                            Failed to load some options. Using defaults.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Section */}
                        <div className="text-center">
                            <div className=" w-28 h-28 mx-auto mb-4">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 border-white shadow-lg">
                                        <User size={40} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md">
                                <Upload size={16} className="mr-2" />
                                Upload Avatar
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                            {formData.aiAvatar && (
                                <p className="mt-2 text-xs text-gray-600 truncate max-w-xs mx-auto">{formData.aiAvatar.name}</p>
                            )}
                        </div>
                        {/* Form Content */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Type *</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => handleInputChange('type', e.target.value)}
                                                disabled={isElementsLoading}
                                                className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.type ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                            >
                                                <option value="">Select Type</option>
                                                {typeOptions.map((type) => {
                                                    const value = type.value || type;
                                                    const label = type.label || type;
                                                    return (
                                                        <option key={value} value={value}>{label}</option>
                                                    );
                                                })}
                                            </select>
                                            {formErrors.type && (
                                                <p className="text-sm text-red-500 mt-1">{formErrors.type}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.title ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                                    placeholder="Enter title"
                                                />
                                                {formErrors.title && (
                                                    <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                                    placeholder="Enter name"
                                                />
                                                {formErrors.name && (
                                                    <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div className="col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.subTitle}
                                                    onChange={(e) => handleInputChange('subTitle', e.target.value)}
                                                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                                    placeholder="Enter sub title"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                                                <input
                                                    type="number"
                                                    value={formData.age}
                                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                                    className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.age ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                                    placeholder="Age"
                                                    min="1"
                                                    max="120"
                                                />
                                                {formErrors.age && (
                                                    <p className="text-sm text-red-500 mt-1">{formErrors.age}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                                            <select
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                disabled={isElementsLoading}
                                                className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.gender ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                            >
                                                <option value="">Select Gender</option>
                                                {genderOptions.map((gender) => (
                                                    <option key={gender} value={gender}>{gender}</option>
                                                ))}
                                            </select>
                                            {formErrors.gender && (
                                                <p className="text-sm text-red-500 mt-1">{formErrors.gender}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Relationship</label>
                                                <select
                                                    value={formData.relationship}
                                                    onChange={(e) => handleInputChange('relationship', e.target.value)}
                                                    disabled={isElementsLoading}
                                                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                                >
                                                    <option value="">Select Relationship</option>
                                                    {relationshipOptions.map((rel) => (
                                                        <option key={rel} value={rel}>{rel}</option>
                                                    ))}
                                                </select>
                                            </div>



                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Expertise</label>
                                                <select
                                                    value={formData.expertise}
                                                    onChange={(e) => handleInputChange('expertise', e.target.value)}
                                                    disabled={isElementsLoading}
                                                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                                >
                                                    <option value="">Select Expertise</option>
                                                    {expertiseOptions.map((exp) => (
                                                        <option key={exp} value={exp}>{exp}</option>
                                                    ))}
                                                </select>
                                            </div>




                                        </div>
                                    </div>




                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Characteristics (multi-select)</label>
                                        <select
                                            multiple
                                            value={formData.characterstics}
                                            onChange={(e) => {
                                                const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                                                handleInputChange('characterstics', selected);
                                            }}
                                            className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 min-h-[160px] ${formErrors.characterstics ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                        >
                                            {characteristicOptions.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        {formErrors.characterstics && (
                                            <p className="text-sm text-red-500 mt-1">{formErrors.characterstics}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Can text every *</label>
                                            <select
                                                value={formData.canTextEvery}
                                                onChange={(e) => handleInputChange('canTextEvery', e.target.value)}
                                                className={`w-full p-4 text-base bg-white rounded-lg border-2 transition-all duration-200 ${formErrors.canTextEvery ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'} focus:ring-4 focus:outline-none`}
                                            >
                                                <option value="">Select schedule</option>
                                                {TEXT_FREQUENCY.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            {formErrors.canTextEvery && (
                                                <p className="text-sm text-red-500 mt-1">{formErrors.canTextEvery}</p>
                                            )}
                                        </div>

                                        {(formData.canTextEvery === 'Weekly' || formData.canTextEvery === 'Monthly' || formData.canTextEvery === 'Yearly') && (
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">On</label>
                                                <select
                                                    value={formData.on}
                                                    onChange={(e) => handleInputChange('on', e.target.value)}
                                                    className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                                >
                                                    <option value="">Select option</option>
                                                    {formData.canTextEvery === 'Weekly' && (
                                                        <>
                                                            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((d) => (
                                                                <option key={d} value={d.toLowerCase()}>{d}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                    {formData.canTextEvery === 'Monthly' && (
                                                        <>
                                                            {[
                                                                '1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th',
                                                                'Random','Last day of month'
                                                            ].map((d) => (
                                                                <option key={d} value={d}>{d}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                    {formData.canTextEvery === 'Yearly' && (
                                                        <>
                                                            {['January','February','March','April','May','June','July','August','September','October','November','December'].map((m) => (
                                                                <option key={m} value={m.toLowerCase()}>{m}</option>
                                                            ))}
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    {formData.canTextEvery !== 'Never' && (
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">At</label>
                                            <input
                                                type="time"
                                                value={formData.at}
                                                onChange={(e) => handleInputChange('at', e.target.value)}
                                                className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">What do you want to hear?</label>
                                        <select
                                            value={formData.wantToHear}
                                            onChange={(e) => handleInputChange('wantToHear', e.target.value)}
                                            disabled={isElementsLoading}
                                            className="w-full p-4 text-base bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                                        >
                                            <option value="">Select what you want to hear</option>
                                            {wantToHearOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                        </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(initialFormData);
                                    setAvatarPreview(null);
                                    setFormErrors({});
                                }}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-sm"
                            >
                                <RotateCcw size={18} className="mr-2" />
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-md"
                            >
                                {isSubmitting ? (
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
                                {isSubmitting ? 'Creating...' : 'Create Contact'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ElementManagementSection = ({ elementName, elementValues, onAddValue, onDeleteValue, onEditValue, isLoading }) => {
    const [newValue, setNewValue] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingValue, setEditingValue] = useState(null);
    const [editInputValue, setEditInputValue] = useState('');

    const handleAddValue = async () => {
        if (!newValue.trim()) return;
        setIsAdding(true);
        try {
            await onAddValue(newValue.trim());
            setNewValue('');
        } catch (error) {
            console.error('Failed to add value:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddValue();
        }
    };

    const handleEditValue = async () => {
        if (!editInputValue.trim() || editInputValue.trim() === editingValue) {
            setEditingValue(null);
            setEditInputValue('');
            return;
        }
        
        try {
            await onEditValue(editingValue, editInputValue.trim());
            setEditingValue(null);
            setEditInputValue('');
        } catch (error) {
            console.error('Failed to edit value:', error);
        }
    };

    const handleEditKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEditValue();
        } else if (e.key === 'Escape') {
            setEditingValue(null);
            setEditInputValue('');
        }
    };

    const startEditing = (value) => {
        setEditingValue(value);
        setEditInputValue(value);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                {elementName.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            
            <div className="space-y-4">
                {/* Add new value */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Add new ${elementName.toLowerCase()}`}
                        className="flex-1 p-3 text-sm bg-white rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
                        disabled={isLoading || isAdding}
                    />
                    <button
                        onClick={handleAddValue}
                        disabled={!newValue.trim() || isLoading || isAdding}
                        className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isAdding ? (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : (
                            <Plus size={16} />
                        )}
                    </button>
                </div>

                {/* Values list */}
                <div className="max-h-60 overflow-y-auto">
                    {elementValues && elementValues.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {elementValues.map((value, index) => (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                                    title={value}
                                    onClick={() => startEditing(value)}
                                >
                                    {editingValue === value ? (
                                        <input
                                            type="text"
                                            value={editInputValue}
                                            onChange={(e) => setEditInputValue(e.target.value)}
                                            onKeyPress={handleEditKeyPress}
                                            onBlur={handleEditValue}
                                            className="flex-1 p-1 text-sm bg-white rounded border border-blue-300 focus:border-blue-500 focus:outline-none"
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="text-sm text-gray-700 flex-1 break-words">{value}</span>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteValue(value);
                                        }}
                                        disabled={isLoading}
                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                        title="Delete value"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">No values added yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [showAiContactForm, setShowAiContactForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [addAdminAiContact, { isLoading: isSubmitting }] = useAddAdminAiContactMutation();
    const [filterType, setFilterType] = useState('new_assistant');
    const { data: listData, refetch } = useGetAdminAiContactsQuery(filterType);
    const [deleteAdminAiContact] = useDeleteAdminAiContactMutation();
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [editElements, { isLoading: isEditingElements }] = useEditElementsMutation();
    const { data: elementsData, isLoading: isElementsLoading, refetch: refetchElements } = useGetElementsQuery();

    const elements = elementsData?.data || elementsData || {};
    const elementsList = elements?.elements || {};

    const aiContactsRaw = listData?.data ?? listData?.AiContacts ?? listData ?? [];
    const aiContacts = Array.isArray(aiContactsRaw.contact)
        ? aiContactsRaw.contact
        : Array.isArray(aiContactsRaw?.data)
            ? aiContactsRaw.data
            : Array.isArray(aiContactsRaw?.AiContacts)
                ? aiContactsRaw.AiContacts
                : (aiContactsRaw && aiContactsRaw._id ? [aiContactsRaw] : []);

    const toTwelveHourNoSpace = (time24) => {
        if (!time24) return '';
        const [hhStr, mm] = time24.split(':');
        let hh = parseInt(hhStr, 10);
        const period = hh >= 12 ? 'PM' : 'AM';
        hh = hh % 12;
        if (hh === 0) hh = 12;
        const hhPadded = hh < 10 ? `0${hh}` : `${hh}`;
        return `${hhPadded}:${mm}${period}`;
    };

    const handleSubmit = async (formData) => {
        setError('');
        setSuccess('');
        try {
            const formattedAt = formData.canTextEvery === 'Never' ? '' : toTwelveHourNoSpace(formData.at);
            const form = new FormData();
            form.append('name', formData.name);
            form.append('age', String(formData.age || ''));
            form.append('gender', formData.gender || '');
            form.append('relationship', formData.relationship || '');
            form.append('expertise', formData.expertise || '');
            form.append('canTextEvery', formData.canTextEvery || '');
            form.append('type', formData.type || '');
            if (formData.on && (formData.canTextEvery === 'Weekly' || formData.canTextEvery === 'Monthly' || formData.canTextEvery === 'Yearly')) {
                form.append('on', String(formData.on));
            }
            if (formattedAt) {
                form.append('at', formattedAt);
            }
            form.append('title', formData.title || '');
            if (formData.subTitle) {
                form.append('subTitle', formData.subTitle);
            }
            form.append('wantToHear', formData.wantToHear || '');
            if (Array.isArray(formData.characterstics)) {
                formData.characterstics.forEach((c) => form.append('characterstics[]', c));
            }
            if (formData.aiAvatar instanceof File) {
                form.append('aiAvatar', formData.aiAvatar);
            }

            await addAdminAiContact(form).unwrap();
            setSuccess('AI Contact created successfully!');
            setTimeout(() => {
                setShowAiContactForm(false);
                setSuccess('');
            }, 1200);
        } catch (err) {
            const message = err?.data?.message || err?.error || 'Failed to create AI Contact. Please try again.';
            setError(message);
        }
    };

    const handleAddElementValue = async (elementName, value) => {
        try {
            const payload = {
                [elementName]: value,
                type: 'update'
            };
            await editElements(payload).unwrap();
            await refetchElements();
            setSuccess(`${elementName} value added successfully!`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            const message = err?.data?.message || err?.error || `Failed to add ${elementName} value. Please try again.`;
            setError(message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDeleteElementValue = async (elementName, value) => {
        try {
            const payload = {
                [elementName]: value,
                type: 'delete'
            };
            await editElements(payload).unwrap();
            await refetchElements();
            setSuccess(`${elementName} value deleted successfully!`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            const message = err?.data?.message || err?.error || `Failed to delete ${elementName} value. Please try again.`;
            setError(message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleEditElementValue = async (elementName, oldValue, newValue) => {
        try {
            // First delete the old value
            const deletePayload = {
                [elementName]: oldValue,
                type: 'delete'
            };
            await editElements(deletePayload).unwrap();
            
            // Then add the new value
            const addPayload = {
                [elementName]: newValue,
                type: 'update'
            };
            await editElements(addPayload).unwrap();
            
            await refetchElements();
            setSuccess(`${elementName} value updated successfully!`);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            const message = err?.data?.message || err?.error || `Failed to update ${elementName} value. Please try again.`;
            setError(message);
            setTimeout(() => setError(''), 5000);
        }
    };

    // Define the elements we want to manage
    const manageableElements = [
        { key: 'relationships', name: 'Relationships' },
        { key: 'experties', name: 'Expertise' },
        { key: 'characteristics', name: 'Characteristics' },
        { key: 'whatYouWantToHear', name: 'What You Want To Hear' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <Settings className="mr-3" />
                        Settings
                    </h1>
                    <p className="text-gray-600 mt-2">Manage application elements and AI contacts</p>
                </div>

                {/* Success/Error Messages */}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}

                {/* Element Management Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Element Management</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {manageableElements.map((element) => (
                            <ElementManagementSection
                                key={element.key}
                                elementName={element.name}
                                elementValues={elementsList[element.key] || []}
                                onAddValue={(value) => handleAddElementValue(element.key, value)}
                                onDeleteValue={(value) => handleDeleteElementValue(element.key, value)}
                                onEditValue={(oldValue, newValue) => handleEditElementValue(element.key, oldValue, newValue)}
                                isLoading={isElementsLoading || isEditingElements}
                            />
                        ))}
                    </div>
                </div>

                {/* AI Contacts Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">AI Contacts</h2>
                        <button
                            onClick={() => setShowAiContactForm(true)}
                            className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md"
                        >
                            <Plus size={18} className="mr-2" />
                            Create AI Contact
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            {label: 'Experts', value: 'new_expert'},
                            {label: 'Companion', value: 'new_companion'},
                            {label: 'Assistant', value: 'new_assistant'},
                            {label: 'Character', value: 'new_characters'},
                        ].map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilterType(f.value)}
                                className={`px-3 py-1.5 rounded-md border ${filterType===f.value? 'bg-[#1976d2] text-white border-[#1976d2]':'bg-white text-gray-700 border-gray-300'} hover:shadow-sm`}
                            >{f.label}</button>
                        ))}
                    </div>

                    {aiContacts.length ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-700">
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Expertise</th>
                                        <th className="px-4 py-2">Age</th>
                                        <th className="px-4 py-2">Relationship</th>
                                        <th className="px-4 py-2">Gender</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aiContacts.map((c) => (
                                        <tr key={c._id} className="border-b">
                                            <td className="px-4 py-2">{c.name}</td>
                                            <td className="px-4 py-2">{c.expertise}</td>
                                            <td className="px-4 py-2">{c.age}</td>
                                            <td className="px-4 py-2">{c.relationship}</td>
                                            <td className="px-4 py-2">{typeof c.gender==='string'? c.gender.charAt(0).toUpperCase()+c.gender.slice(1).toLowerCase():''}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <button
                                                    onClick={async () => { try { await deleteAdminAiContact(c._id).unwrap(); refetch(); } catch(e){} }}
                                                    className="px-2 py-1 text-xs rounded bg-red-600 text-white"
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                            <User className="mx-auto text-gray-400 mb-3" size={40} />
                            <h3 className="font-medium text-gray-700 mb-1">No AI Contacts</h3>
                            <p className="text-gray-600 text-sm mb-4">Choose a type or create one</p>
                        </div>
                    )}

                    <EditAiContactModal
                        open={openEdit}
                        onClose={() => { setOpenEdit(false); setSelectedContact(null); }}
                        contact={selectedContact}
                        onUpdate={() => { refetch(); setOpenEdit(false); setSelectedContact(null); }}
                    />
                </div>
            </div>

            {/* AI Contact Form Modal */}
            {showAiContactForm && (
                <AiContactForm
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    error={error}
                    success={success}
                    onClose={() => setShowAiContactForm(false)}
                />
            )}
        </div>
    );
};

export default SettingsPage;

