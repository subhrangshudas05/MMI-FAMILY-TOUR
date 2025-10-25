"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, X, Save, MapPin, Calendar, DollarSign, FileText, Image, PlusCircle, Sparkles, Percent, Tag } from 'lucide-react';

const OfferPackageCreateComponent = ({ onClose,handleOfferPackageCreate }) => {
  const [formData, setFormData] = useState({
    route: '',
    title: '',
    overview: '',
    places: [{ name: '', img: '' }],
    plans: [{ title: '', plan: '' }],
    ds: '',
    ns: '',
    price: '',
    // Offer-specific fields
    month: '',
    realPrice: '',
    tagline: '',
    extras: []
  });

  const [createDialog, setCreateDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newExtraKey, setNewExtraKey] = useState('');
  const [newExtraValue, setNewExtraValue] = useState('');
  const [errors, setErrors] = useState({});

  // Month options for dropdown
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template]
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    if (formData[arrayName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [arrayName]: prev[arrayName].filter((_, i) => i !== index)
      }));
    }
  };

  const addExtra = () => {
    if (newExtraKey.trim() && newExtraValue.trim()) {
      setFormData(prev => ({
        ...prev,
        extras: [...prev.extras, { key: newExtraKey.trim(), value: newExtraValue.trim() }]
      }));
      setNewExtraKey('');
      setNewExtraValue('');
    }
  };

  const removeExtra = (index) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.route.trim()) newErrors.route = 'Route is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.overview.trim()) newErrors.overview = 'Overview is required';
    if (!formData.ds.trim()) newErrors.ds = 'Days is required';
    if (!formData.ns.trim()) newErrors.ns = 'Nights is required';
    if (!formData.price.trim()) newErrors.price = 'Offer price is required';
    
    // Offer-specific required fields
    if (!formData.month.trim()) newErrors.month = 'Offer month is required';
    if (!formData.realPrice.trim()) newErrors.realPrice = 'Original price is required';
    if (!formData.tagline.trim()) newErrors.tagline = 'Tagline is required';

    // Validate places
    const invalidPlaces = formData.places.some(place => !place.name.trim() || !place.img.trim());
    if (invalidPlaces) newErrors.places = 'All places must have name and image URL';

    // Validate plans
    const invalidPlans = formData.plans.some(plan => !plan.title.trim() || !plan.plan.trim());
    if (invalidPlans) newErrors.plans = 'All plans must have title and description';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Convert extras array back to object
      const extrasObj = {};
      formData.extras.forEach(({ key, value }) => {
        extrasObj[key] = value;
      });

      const createData = {
        ...formData,
        extras: extrasObj
      };

      await handleOfferPackageCreate(createData);
      setCreateDialog(false);
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Create failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      route: '',
      title: '',
      overview: '',
      places: [{ name: '', img: '' }],
      plans: [{ title: '', plan: '' }],
      ds: '',
      ns: '',
      price: '',
      month: '',
      realPrice: '',
      tagline: '',
      extras: []
    });
    setErrors({});
    setNewExtraKey('');
    setNewExtraValue('');
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (formData.price && formData.realPrice) {
      const price = parseFloat(formData.price.replace(/,/g, ''));
      const realPrice = parseFloat(formData.realPrice.replace(/,/g, ''));
      if (realPrice > price) {
        return Math.round(((realPrice - price) / realPrice) * 100);
      }
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999 text-black poppins p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Percent size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Create New Offer Package</h2>
              <p className="text-orange-100 text-sm">Add a promotional package with special pricing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FileText size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                <p className="text-sm text-gray-600">Enter the core details of your offer package</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => handleInputChange('route', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.route ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., sundarban_wildlife_escape"
                />
                {errors.route && <p className="text-red-500 text-xs mt-1">{errors.route}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Sundarban Wilderness Getaway"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Days <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ds}
                    onChange={(e) => handleInputChange('ds', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.ds ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="3"
                  />
                  {errors.ds && <p className="text-red-500 text-xs mt-1">{errors.ds}</p>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nights <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.ns}
                    onChange={(e) => handleInputChange('ns', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.ns ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="2"
                  />
                  {errors.ns && <p className="text-red-500 text-xs mt-1">{errors.ns}</p>}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Offer Month <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.month ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select offer month</option>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.overview}
                onChange={(e) => handleInputChange('overview', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.overview ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Embark on a thrilling 3-day journey into the world's largest mangrove..."
              />
              {errors.overview && <p className="text-red-500 text-xs mt-1">{errors.overview}</p>}
            </div>
          </section>

          {/* Offer Pricing Section */}
          <section>
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <DollarSign size={20} className="text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Offer Pricing & Promotion</h3>
                <p className="text-sm text-gray-600">Set up promotional pricing and tagline</p>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    💰 Offer Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.price ? 'border-red-300 bg-red-50' : 'border-orange-300'
                    }`}
                    placeholder="5,999"
                  />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    💸 Original Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.realPrice}
                    onChange={(e) => handleInputChange('realPrice', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                      errors.realPrice ? 'border-red-300 bg-red-50' : 'border-orange-300'
                    }`}
                    placeholder="6,999"
                  />
                  {errors.realPrice && <p className="text-red-500 text-xs mt-1">{errors.realPrice}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">
                    💯 Discount
                  </label>
                  <div className="px-3 py-2 bg-orange-100 border border-orange-300 rounded-lg text-orange-700 font-semibold">
                    {calculateDiscount()}% OFF
                  </div>
                </div>
              </div>
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Tag size={16} className="mr-1" />
                  Promotional Tagline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange('tagline', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.tagline ? 'border-red-300 bg-red-50' : 'border-orange-300'
                  }`}
                  placeholder="10 together, 1 goes half-price!"
                />
                {errors.tagline && <p className="text-red-500 text-xs mt-1">{errors.tagline}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  💡 Create a catchy promotional message to attract customers
                </p>
              </div>
            </div>
          </section>

          {/* Places Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <MapPin size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Places ({formData.places.length})
                  </h3>
                  <p className="text-sm text-gray-600">Add destinations included in this offer package</p>
                </div>
              </div>
              <button
                onClick={() => addArrayItem('places', { name: '', img: '' })}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center text-sm font-medium transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Add Place
              </button>
            </div>
            
            {errors.places && <p className="text-red-500 text-sm mb-3">{errors.places}</p>}
            
            <div className="space-y-4">
              {formData.places.map((place, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 p-4 rounded-lg border border-green-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-green-700 bg-green-200 px-2 py-1 rounded">
                      Place #{index + 1}
                    </span>
                    {formData.places.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('places', index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Place name (e.g., Sundarbans National Park)"
                      value={place.name}
                      onChange={(e) => handleArrayChange('places', index, 'name', e.target.value)}
                      className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="Image URL (https://...)"
                      value={place.img}
                      onChange={(e) => handleArrayChange('places', index, 'img', e.target.value)}
                      className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Plans Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Itinerary Plans ({formData.plans.length})
                  </h3>
                  <p className="text-sm text-gray-600">Create day-by-day travel itinerary</p>
                </div>
              </div>
              <button
                onClick={() => addArrayItem('plans', { title: '', plan: '' })}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg flex items-center text-sm font-medium transition-colors"
              >
                <Plus size={16} className="mr-1" />
                Add Day
              </button>
            </div>
            
            {errors.plans && <p className="text-red-500 text-sm mb-3">{errors.plans}</p>}
            
            <div className="space-y-4">
              {formData.plans.map((plan, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-50 p-4 rounded-lg border border-purple-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-purple-700 bg-purple-200 px-2 py-1 rounded">
                      Day #{index + 1}
                    </span>
                    {formData.plans.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('plans', index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Day title (e.g., Arrival & Mangrove Exploration)"
                      value={plan.title}
                      onChange={(e) => handleArrayChange('plans', index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Day plan description..."
                      value={plan.plan}
                      onChange={(e) => handleArrayChange('plans', index, 'plan', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Extras Section */}
          <section>
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <Sparkles size={20} className="text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Extra Fields ({formData.extras.length})
                </h3>
                <p className="text-sm text-gray-600">Add custom attributes for enhanced package details</p>
              </div>
            </div>
            
            {/* Add new extra field */}
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Custom Field</h4>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Field key (e.g., 'difficulty', 'season')"
                  value={newExtraKey}
                  onChange={(e) => setNewExtraKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Field value (e.g., 'easy', 'winter')"
                  value={newExtraValue}
                  onChange={(e) => setNewExtraValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addExtra}
                  disabled={!newExtraKey.trim() || !newExtraValue.trim()}
                  className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="mt-3 p-3 bg-white rounded border border-indigo-200">
                <p className="text-xs text-gray-600 mb-2">💡 <strong>Examples of useful extra fields:</strong></p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded">difficulty → easy</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">season → winter</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">group_size → 2-10</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">meals → included</span>
                </div>
              </div>
            </div>

            {/* Existing extras */}
            {formData.extras.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Added Custom Fields:</h4>
                {formData.extras.map((extra, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 p-3 rounded-lg border flex items-center justify-between"
                  >
                    <div className="flex space-x-3 flex-1">
                      <span className="text-sm font-semibold text-gray-700 bg-white px-3 py-1 rounded-md border">
                        {extra.key}
                      </span>
                      <span className="text-sm text-gray-600 self-center">→</span>
                      <span className="text-sm text-gray-800 self-center">{extra.value}</span>
                    </div>
                    <button
                      onClick={() => removeExtra(index)}
                      className="text-red-500 hover:text-red-700 ml-3 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-2 justify-between items-center rounded-b-2xl">
          <button
            onClick={resetForm}
            className="text-gray-500 bg-gray-200 hover:text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
          >
            <X size={20} className="mr-2" />
            Reset Form
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCreateDialog(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-all shadow-md hover:shadow-lg"
            >
              <Percent size={20} className="mr-2" />
              Create Offer Package
            </button>
          </div>
        </div>
      </motion.div>

      {/* Create Confirmation Dialog */}
      {createDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-250">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-mx-4 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Percent className="text-orange-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Create Offer Package</h3>
                <p className="text-gray-600">Add this promotional package to your collection?</p>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg mb-6 border border-orange-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Package:</strong> {formData.title || 'Untitled Offer Package'}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Duration:</strong> {formData.ds} Days / {formData.ns} Nights
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Offer Month:</strong> {formData.month}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  <strong>Price:</strong> ₹{formData.price}
                </span>
                {formData.realPrice && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{formData.realPrice}
                    </span>
                    <span className="text-sm bg-orange-200 text-orange-800 px-2 py-1 rounded font-semibold">
                      {calculateDiscount()}% OFF
                    </span>
                  </>
                )}
              </div>
              {formData.tagline && (
                <p className="text-sm text-orange-700 font-medium mt-2">
                  "{formData.tagline}"
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCreateDialog(false)}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Percent size={16} className="mr-2" />
                    Create Offer
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OfferPackageCreateComponent;