import React, { useState } from 'react';



const ContactSection = () => {
    return (
        <section className="bg-darkblue-500 py-16">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                {/* Image Section (Optional) */}
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
          
                </div>
                <ContactForm />
            </div>
        </section>
    );
};






const ContactForm = () => {
    const [formData, setFormData] = useState({ 
        name: '',
        email: '',
        message: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          setIsSubmitting(true);
          setSubmitMessage(null); // clear any previous messages
      
          try {
            // Simulate an API request with a timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
      
            setSubmitMessage({ type: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
          } catch (error) {
            setSubmitMessage({ type: 'error', message: 'There was an error sending your message.' });
          } finally {
            setIsSubmitting(false);
          }
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full  p-6 rounded-md bg-white shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-darkblue-500">Get In Touch</h2>
            {submitMessage && (
                <div
                    className={`mb-4 p-3 rounded-md text-white ${submitMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                >
                    {submitMessage.message}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border rounded-md ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full p-2 border rounded-md ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                ></textarea>
                {formErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                )}
            </div>
            <button
                type="submit"
                className={`py-2 px-4 rounded-md text-white font-semibold hover:bg-orange-600 transition-colors duration-200 ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500'
                  }`}
                disabled={isSubmitting}
            >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
};

export default ContactSection;