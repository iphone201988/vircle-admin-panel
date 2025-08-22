import React, { useMemo, useState } from 'react';
import { Upload, User, Save, RotateCcw, Settings, Plus, X } from 'lucide-react';
import { useAddAdminAiContactMutation, useGetElementsQuery, useGetAdminAiContactsQuery, useDeleteAdminAiContactMutation, useUpdateAdminAiContactMutation } from '../../rtk/api/adminApi';
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
        const rel = elements.relationships || elements.relationshipOptions || elements.relationship;
        return Array.isArray(rel) && rel.length ? rel : [
            'No Relationship','Friend','Boyfriend','Girlfriend','Stranger','New acquaintance','Husband','Wife','Mentor','Coach','Personal Assistant','Dad','Mother','Teacher','Manager'
        ];
    }, [elements]);

    const expertiseOptions = useMemo(() => {
        const exp = elements.expertises || elements.expertiseOptions || elements.expertise;
        return Array.isArray(exp) && exp.length ? exp : [
            'No Expertise','Wellness Coach','Fitness Trainer','Nutrition Guide','Career Mentor','Business Advisor','Study Buddy','Language Partner','Math Tutor','Cooking Expert','Science Tutor','Writing Coach','Emotional Support','Life Listener','Organizer','Productivity Assistant','Financial Guide','Tech Support','Travel Planner','Fashion Stylist','News Curator','Legal Info Helper','Health Information','Creativity Coach','History Expert','Parenting Advisor','Movie Geek','Music Enthusiast','Art Critic','Bookworm','Theatre Enthusiast','Dance Guide','Wild Curiosities Explorer','Museum Guide','History Aficionado','Photography Mentor','Local Finder'
        ];
    }, [elements]);

    const wantToHearOptions = useMemo(() => {
        const wth = elements.wantToHear || elements.wantToHearOptions || elements.whatDoYouWantToHear;
        return Array.isArray(wth) && wth.length ? wth : [
            'Random Message','Greeting','Daily News','Weekly News','Daily Motivation','Mood Boosters','Inspirational Quotes','Check-in on Recent Events','Wellness Check-ins','Dietary Reminders','Water Consumption Reminder','Meditation Reminder','Stretching Reminder','Fun Facts','Weather Forecast','Movie Recommendations','Book Suggestions','Study Tips','Jokes','Role Playing','Language Practise','Cooking Recipes'
        ];
    }, [elements]);

    const characteristicOptions = useMemo(() => {
        const chars = elements.characterstics || elements.charactersticsOptions;
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200">
                <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-xl p-5 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Create AI Contact</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X size={20} />
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
                            <div className="relative w-24 h-24 mx-auto mb-3">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full rounded-full object-cover border-4 border-white shadow"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow">
                                        <User size={36} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#1976d2] text-white rounded-md hover:bg-[#1565c0] transition-colors duration-200 text-sm font-medium shadow">
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
                        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Type *</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => handleInputChange('type', e.target.value)}
                                                disabled={isElementsLoading}
                                                className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.type ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
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
                                                <p className="text-sm text-red-500 mt-1.5">{formErrors.type}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                                    className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.title ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                                    placeholder="Enter title"
                                                />
                                                {formErrors.title && (
                                                    <p className="text-sm text-red-500 mt-1.5">{formErrors.title}</p>
                                                )}
                                            </div>
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

                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sub Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.subTitle}
                                                    onChange={(e) => handleInputChange('subTitle', e.target.value)}
                                                    className={`w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                                    placeholder="Enter sub title"
                                                />
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
                                                disabled={isElementsLoading}
                                                className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.gender ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                            >
                                                <option value="">Select Gender</option>
                                                {genderOptions.map((gender) => (
                                                    <option key={gender} value={gender}>{gender}</option>
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
                                                    disabled={isElementsLoading}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                >
                                                    <option value="">Select Relationship</option>
                                                    {relationshipOptions.map((rel) => (
                                                        <option key={rel} value={rel}>{rel}</option>
                                                    ))}
                                                </select>
                                            </div>



                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Expertise</label>
                                                <select
                                                    value={formData.expertise}
                                                    onChange={(e) => handleInputChange('expertise', e.target.value)}
                                                    disabled={isElementsLoading}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">characterstics (multi-select)</label>
                                        <select
                                            multiple
                                            value={formData.characterstics}
                                            onChange={(e) => {
                                                const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
                                                handleInputChange('characterstics', selected);
                                            }}
                                            className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.characterstics ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-h-[160px]`}
                                        >
                                            {characteristicOptions.map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        {formErrors.characterstics && (
                                            <p className="text-sm text-red-500 mt-1.5">{formErrors.characterstics}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Can text every *</label>
                                            <select
                                                value={formData.canTextEvery}
                                                onChange={(e) => handleInputChange('canTextEvery', e.target.value)}
                                                className={`w-full p-3.5 text-base bg-white rounded-lg border ${formErrors.canTextEvery ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                                            >
                                                <option value="">Select schedule</option>
                                                {TEXT_FREQUENCY.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            {formErrors.canTextEvery && (
                                                <p className="text-sm text-red-500 mt-1.5">{formErrors.canTextEvery}</p>
                                            )}
                                        </div>

                                        {(formData.canTextEvery === 'Weekly' || formData.canTextEvery === 'Monthly' || formData.canTextEvery === 'Yearly') && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">On</label>
                                                <select
                                                    value={formData.on}
                                                    onChange={(e) => handleInputChange('on', e.target.value)}
                                                    className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">At</label>
                                            <input
                                                type="time"
                                                value={formData.at}
                                                onChange={(e) => handleInputChange('at', e.target.value)}
                                                className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">What do you want to hear?</label>
                                        <select
                                            value={formData.wantToHear}
                                            onChange={(e) => handleInputChange('wantToHear', e.target.value)}
                                            disabled={isElementsLoading}
                                            className="w-full p-3.5 text-base bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                        <div className="flex gap-5 pt-5">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(initialFormData);
                                    setAvatarPreview(null);
                                    setFormErrors({});
                                }}
                                disabled={isSubmitting}
                                className="flex-1 px-5 py-3.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-sm"
                            >
                                <RotateCcw size={18} className="mr-2" />
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-2 px-5 py-3.5 bg-[#1976d2] text-white rounded-lg hover:bg-[#1565c0] transition-all duration-200 disabled:opacity-50 flex items-center justify-center text-base font-medium shadow-md"
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

const SettingsPage = () => {
    const [showAiContactForm, setShowAiContactForm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [addAdminAiContact, { isLoading: isSubmitting } ] = useAddAdminAiContactMutation();
    const [filterType, setFilterType] = useState('new_assistant');
    const { data: listData, refetch } = useGetAdminAiContactsQuery(filterType);
    const [deleteAdminAiContact] = useDeleteAdminAiContactMutation();
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const aiContactsRaw = listData?.data ?? listData?.AiContacts ?? listData ?? [];
    console.log('=============jasdhjkasdhjashdajkushd',aiContactsRaw.contact);
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
                                                        onClick={() => { setSelectedContact(c); setOpenEdit(true); }}
                                                        className="px-2 py-1 text-xs rounded bg-blue-600 text-white"
                                                    >Edit</button>
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

