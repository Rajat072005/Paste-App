

import React, { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import Lottie from 'react-lottie-player';
import toast from 'react-hot-toast';

import contactLottieJson from '../assets/Contact Us.json';
import contactAnimationFile from '/rive/contact_us.riv';

// SVG Icon Components
const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );

 
const styles = {       
    
    contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
    animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
    lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
    formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
    formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
    formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
    contactForm: { width: '100%', maxWidth: '500px' },
    inputGroup: { position: 'relative', marginBottom: '1.5rem' },
    inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
    input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
    textarea: { resize: 'vertical', minHeight: '120px' },

    // --- MODIFIED STYLES ---
    animationClipContainer: { position: 'relative', width: '100%', height: '100px', marginTop: '1rem' },
    characterContainer: { position: 'absolute', top: '-70px', left: '100px', height: '100px', display: 'flex', alignItems: 'center',   },
    riveWrapper: { width: '500px', height: '500px' },
    submitButton: {
        position: 'absolute',
        // This 'left' value is now critical. Adjust it to position the button
        // exactly where the character's hand will be.
        left: '300px',
        top: '37px', // Adjust vertical position as needed
        width: 'auto',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#fff',
        backgroundColor: '#1e1e2f',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        // The button's own transition. It starts 200ms after the character starts moving
        // and finishes at the same time.
        transition: 'transform 2000ms linear',
    },
};

const STATE_MACHINE_NAME = 'State Machine 1';
const TRIGGER_NAME = 'Trigger 1';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
    const [characterPositionX, setCharacterPositionX] = useState(250);
    const [characterOpacity, setCharacterOpacity] = useState(0);
    const [riveResetKey, setRiveResetKey] = useState(0);

    const [buttonStyles, setButtonStyles] = useState({
        opacity: 0,
        transform: 'translateX(90px)',
    });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { rive, RiveComponent } = useRive({
        src: contactAnimationFile,
        stateMachines: STATE_MACHINE_NAME,
        autoplay: true, // Allow initial entry→wait animation
    });

    // ✅ Always re-fetch trigger after Rive resets
    const walkTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TRIGGER_NAME);

    // ✅ Fire animation safely
    useEffect(() => {
        if (!isAnimationTriggered || !walkTriggerInput || !rive) return;

        walkTriggerInput.fire(); // Safe now

        requestAnimationFrame(() => {
            setCharacterOpacity(1);
            setCharacterPositionX(0);
            setButtonStyles({ opacity: 1, transform: 'translateX(0)' });
        });
    }, [isAnimationTriggered, walkTriggerInput, rive]);

    const handleMessageChange = (e) => {
        const val = e.target.value;
        setMessage(val);

        if (!isAnimationTriggered && val.trim().length > 0) {
            setIsAnimationTriggered(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, message });
        toast.success('Thank you for your message!');

        // Reset form
        setName('');
        setEmail('');
        setMessage('');

        // Reset UI animation parts
        setIsAnimationTriggered(false);
        setCharacterOpacity(0);
        setCharacterPositionX(250);
        setButtonStyles({ opacity: 0, transform: 'translateX(90px)' });

        // 🔥 Fully Reset Rive Animation
        setRiveResetKey(prev => prev + 1);
    };

    const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
    const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
    const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;

    return (
        <div style={contactContainerStyle}>
            <div style={animationContainerStyle}>
                <Lottie animationData={contactLottieJson} play loop style={styles.lottieAnimation} />
            </div>

            <div style={formContainerStyle}>
                <h1 style={styles.formContainerH1}>Get in Touch</h1>
                <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>

                <form onSubmit={handleSubmit} style={styles.contactForm}>
                    <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
                    <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
                    <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={handleMessageChange} required style={{ ...styles.input, ...styles.textarea }} /></div>

                    <div style={styles.animationClipContainer}>
                        <div style={{ ...styles.characterContainer, opacity: characterOpacity, transform: `translateX(${characterPositionX}px)` }}>
                            <div style={{ ...styles.riveWrapper, visibility: isAnimationTriggered ? 'visible' : 'hidden' }}>
                                
                                {/* ✅ The important fix: key added HERE */}
                                <RiveComponent key={riveResetKey} style={{ width: '100%', height: '100%' }} />
                                
                            </div>
                        </div>

                        <button type="submit" style={{ ...styles.submitButton, ...buttonStyles }}>
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;

