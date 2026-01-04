// // src/components/ContactPage.jsx

// import React, { useState } from 'react';
// import styles from './ContactPage.module.css';
// import Lottie from 'lottie-react';
// // import SubmitButton from './SubmitButton';
// import contactAnimation from '../../public/lottie/Contact Us.json';
// import { FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

// const ContactPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
    
//     // We lift the button's state up to the page component
//     const [buttonState, setButtonState] = useState('idle');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Don't do anything if the form is already submitting or done
//         if (buttonState !== 'idle') return;

//         // 1. Start the button's 'sending' animation immediately
//         setButtonState('sending');

//         // 2. Simulate sending the form data (e.g., to an API)
//         // We use a timeout to mimic a network request.
//         setTimeout(() => {
//             // This is where you would handle the actual form submission logic
//             console.log({ name, email, message });
            
//             // 3. Once "submitted", change the button to the 'done' state
//             setButtonState('done');
            
//             // 4. Clear the form fields
//             setName('');
//             setEmail('');
//             setMessage('');
//         }, 1500); // This timeout should match the animation duration
//     };

//     return (
//         <div className={styles.contactContainer}>
//             <div className={styles.animationContainer}>
//                 <Lottie
//                     animationData={contactAnimation}
//                     loop={true}
//                     autoplay={true}
//                     className={styles.lottieAnimation}
//                 />
//             </div>
//             <div className={styles.formContainer}>
//                 <h1>Get in Touch</h1>
//                 <p>We'd love to hear from you. Please fill out this form.</p>
//                 <form onSubmit={handleSubmit} className={styles.contactForm}>
//                     <div className={styles.inputGroup}>
//                         <FaUser className={styles.inputIcon} />
//                         <input
//                             type="text"
//                             placeholder="Your Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <FaEnvelope className={styles.inputIcon} />
//                         <input
//                             type="email"
//                             placeholder="Your Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className={styles.inputGroup}>
//                         <FaPen className={styles.inputIcon} />
//                         <textarea
//                             placeholder="Your Message"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             required
//                         ></textarea>
//                     </div>
//                     <button type="submit" className={styles.submitButton}>
//                         Send Message
//                     </button>
                    
//                     {/* <SubmitButton buttonState={buttonState} /> */}

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ContactPage;

// import React, { useState, useEffect } from 'react';
// import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json'; 
// import contactAnimationFile from '../assets/contact_us.riv';

// // SVG Icon Components
// const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
// const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
// const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );

// // --- Styles have been simplified and fixed ---
// const styles = {
//     contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//     animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//     lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//     formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//     formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//     formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//     contactForm: { width: '100%', maxWidth: '500px' },
//     inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//     inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//     input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//     textarea: { resize: 'vertical', minHeight: '120px' },
//     animationAndButtonContainer: { display: 'flex', alignItems: 'center', width: '100%', minHeight: '150px', marginTop: '1rem' },
//     riveAnimation: { width: '250px', height: '150px', marginRight: '-50px', zIndex: 1 },
//     submitButton: { width: 'auto', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600, color: '#fff', backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap' },
// };

// const STATE_MACHINE_NAME = 'State Machine 1';
// const TRIGGER_NAME = 'Trigger 1';
// const WALK_ANIMATION_NAME = 'walk';

// const ContactPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
//     const [buttonPositionX, setButtonPositionX] = useState(-500);
//     const [buttonOpacity, setButtonOpacity] = useState(0);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 992);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const { rive, RiveComponent } = useRive({
//         src: contactAnimationFile,
//         stateMachines: STATE_MACHINE_NAME,
//         autoplay: true,
//         onLoop: () => {
//             console.log('Looping, playing animations:', rive?.playingAnimationNames);

//             if (rive && rive.playingAnimationNames.includes(WALK_ANIMATION_NAME)) {
//                 const walkAnimation = rive.animationByName(WALK_ANIMATION_NAME);
//                 if (!walkAnimation) return;
//                 const progress = walkAnimation.time / walkAnimation.duration;
//                 const newX = -500 + (500 * progress);
//                 setButtonPositionX(newX);
//                 setButtonOpacity(progress);
//             } else if (isAnimationTriggered) {
//                 setButtonPositionX(0);
//                 setButtonOpacity(1);
//             }
//         },
//     });

//     const walkTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TRIGGER_NAME);

//     useEffect(() => {
//         if (isAnimationTriggered && walkTriggerInput) {
//             walkTriggerInput.fire();
//         }
//     }, [isAnimationTriggered, walkTriggerInput]);

//     const handleTriggerAnimation = () => {
//         if (!isAnimationTriggered) setIsAnimationTriggered(true);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ name, email, message });
//         alert('Thank you for your message!');
//         setName('');
//         setEmail('');
//         setMessage('');
//     };
    
//     const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
//     const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
//     const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;

//     return (
//         <div style={contactContainerStyle}>
//             <div style={animationContainerStyle}>
//                 <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//             </div>
//             <div style={formContainerStyle}>
//                 <h1 style={styles.formContainerH1}>Get in Touch</h1>
//                 <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>
//                 <form onSubmit={handleSubmit} style={styles.contactForm}>
//                     <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} onFocus={handleTriggerAnimation} required style={{...styles.input, ...styles.textarea}} ></textarea></div>
                    
//                     <div style={styles.animationAndButtonContainer}>
//                         <div style={styles.riveAnimation}>
//                             <RiveComponent />
//                         </div>
//                         <button
//                             type="submit"
//                             style={{
//                                 ...styles.submitButton,
//                                 opacity: buttonOpacity,
//                                 transform: `translateX(${buttonPositionX}px)`,
//                                 pointerEvents: buttonOpacity < 1 ? 'none' : 'auto',
//                             }}
//                         >
//                             Send Message
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ContactPage;


// import React, { useState, useEffect } from 'react';
// import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json';
// import contactAnimationFile from '../assets/contact_us.riv';

// // (SVG icon components same as yours — omitted for brevity in this snippet)
// // Keep UserIcon, EnvelopeIcon, PenIcon from your original file.

// const UserIcon = ({ style }) => (
//   <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//     <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
//   </svg>
// );

// const EnvelopeIcon = ({ style }) => (
//   <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//     <path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
//   </svg>
// );

// const PenIcon = ({ style }) => (
//   <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
//     <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path>
//   </svg>
// );

// const styles = {
//   contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//   animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//   lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//   formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//   formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//   formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//   contactForm: { width: '100%', maxWidth: '500px' },
//   inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//   inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//   input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//   textarea: { resize: 'vertical', minHeight: '120px' },
//   animationAndButtonContainer: { display: 'flex', alignItems: 'center', width: '100%', minHeight: '150px', marginTop: '1rem' },
//   riveWrapper: {
//     width: '250px',
//     height: '150px',
//     marginRight: '-50px',
//     zIndex: 1,
//     // we'll animate visibility/opacity via inline styles in the component
//   },
//   submitButton: {
//     width: 'auto',
//     padding: '1rem 2.5rem',
//     fontSize: '1.1rem',
//     fontWeight: 600,
//     color: '#fff',
//     backgroundColor: '#1e1e2f',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     whiteSpace: 'nowrap',
//     // smooth transition for the slide+fade:
//     transition: 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 400ms ease',
//   },
// };

// const STATE_MACHINE_NAME = 'State Machine 1';
// const TRIGGER_NAME = 'Trigger 1';

// const ContactPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);

//   // button states used by inline style transitions:
//   const [buttonPositionX, setButtonPositionX] = useState(-250); // start off-screen
//   const [buttonOpacity, setButtonOpacity] = useState(0);

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 992);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // IMPORTANT: autoplay false so the character doesn't move or reveal itself before trigger
//   const { rive, RiveComponent } = useRive({
//     src: contactAnimationFile,
//     stateMachines: STATE_MACHINE_NAME,
//     autoplay: false,
//   });

//   const walkTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TRIGGER_NAME);

//   // When animation is triggered, fire the rive state machine input and animate the button in with CSS transitions
//   useEffect(() => {
//     if (!isAnimationTriggered) return;

//     // Fire Rive trigger (if available)
//     if (walkTriggerInput) {
//       try {
//         walkTriggerInput.fire();
//       } catch (err) {
//         // swallow; input might not be ready the exact instant, but it's okay
//         console.warn('rive trigger failed:', err);
//       }
//     }

//     // Visually slide-in the button:
//     // Set to intermediate start then on next frame set to final so CSS transition runs
//     setButtonOpacity(0);
//     setButtonPositionX(-250);
//     // Allow a tiny delay so the transition triggers cleanly
//     const t = requestAnimationFrame(() => {
//       // You can tweak the timing to better match the Rive animation
//       setButtonPositionX(0);
//       setButtonOpacity(1);
//     });

//     return () => cancelAnimationFrame(t);
//   }, [isAnimationTriggered, walkTriggerInput]);

//   // Trigger animation when the user starts typing (first non-space character).
//   const handleMessageChange = (e) => {
//     const val = e.target.value;
//     setMessage(val);
//     if (!isAnimationTriggered && val.trim().length > 0) {
//       setIsAnimationTriggered(true);
//     }
//   };

//   // still allow onFocus to trigger as fallback (optional)
//   const handleTextareaFocus = () => {
//     // don't force trigger on focus unless they start typing, but you can enable if desired:
//     // setIsAnimationTriggered(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ name, email, message });
//     alert('Thank you for your message!');
//     setName('');
//     setEmail('');
//     setMessage('');
//     // optionally hide or keep the animation as-is
//   };

//   const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
//   const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
//   const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;

//   return (
//     <div style={contactContainerStyle}>
//       <div style={animationContainerStyle}>
//         <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//       </div>

//       <div style={formContainerStyle}>
//         <h1 style={styles.formContainerH1}>Get in Touch</h1>
//         <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>
//         <form onSubmit={handleSubmit} style={styles.contactForm}>
//           <div style={styles.inputGroup}>
//             <UserIcon style={styles.inputIcon} />
//             <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
//           </div>

//           <div style={styles.inputGroup}>
//             <EnvelopeIcon style={styles.inputIcon} />
//             <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
//           </div>

//           <div style={styles.inputGroup}>
//             <PenIcon style={styles.inputIcon} />
//             <textarea
//               placeholder="Your Message"
//               value={message}
//               onChange={handleMessageChange}
//               onFocus={handleTextareaFocus}
//               required
//               style={{ ...styles.input, ...styles.textarea }}
//             />
//           </div>

//           <div style={styles.animationAndButtonContainer}>
//             <div
//               style={{
//                 ...styles.riveWrapper,
//                 // hide the character until triggered to avoid any initial visual
//                 visibility: isAnimationTriggered ? 'visible' : 'hidden',
//                 opacity: isAnimationTriggered ? 1 : 0,
//                 transition: 'opacity 300ms ease, visibility 0ms linear 300ms',
//                 pointerEvents: isAnimationTriggered ? 'auto' : 'none',
//               }}
//             >
//               {/* RiveComponent is mounted even when hidden — if you prefer to avoid loading before trigger,
//                   you can render it conditionally: {isAnimationTriggered && <RiveComponent />} */}
//               <RiveComponent style={{ width: '100%', height: '100%' }} />
//             </div>

//             <button
//               type="submit"
//               style={{
//                 ...styles.submitButton,
//                 opacity: buttonOpacity,
//                 transform: `translateX(${buttonPositionX}px)`,
//                 pointerEvents: buttonOpacity < 1 ? 'none' : 'auto',
//               }}
//             >
//               Send Message
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;


// import React, { useState, useEffect } from 'react';
// import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json';
// import contactAnimationFile from '/rive/contact_us.riv';

// // SVG Icon Components
// const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
// const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
// const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );

 
// const styles = {       
    
//     contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//     animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//     lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//     formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//     formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//     formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//     contactForm: { width: '100%', maxWidth: '500px' },
//     inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//     inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//     input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//     textarea: { resize: 'vertical', minHeight: '120px' },

//     // --- MODIFIED STYLES ---
//     animationClipContainer: { position: 'relative', width: '100%', height: '100px', marginTop: '1rem' },
//     characterContainer: { position: 'absolute', top: '-70px', left: '100px', height: '100px', display: 'flex', alignItems: 'center',   },
//     riveWrapper: { width: '500px', height: '500px' },
//     submitButton: {
//         position: 'absolute',
//         // This 'left' value is now critical. Adjust it to position the button
//         // exactly where the character's hand will be.
//         left: '300px',
//         top: '37px', // Adjust vertical position as needed
//         width: 'auto',
//         padding: '1rem 2.5rem',
//         fontSize: '1.1rem',
//         fontWeight: 600,
//         color: '#fff',
//         backgroundColor: '#1e1e2f',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         whiteSpace: 'nowrap',
//         // The button's own transition. It starts 200ms after the character starts moving
//         // and finishes at the same time.
//         transition: 'transform 2000ms linear',
//     },
// };


// const STATE_MACHINE_NAME = 'State Machine 1';
// const TRIGGER_NAME = 'Trigger 1';

// const ContactPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
//     // const [pusherPositionX, setPusherPositionX] = useState(-500);
//     // const [pusherOpacity, setPusherOpacity] = useState(0);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//     const [characterPositionX, setCharacterPositionX] = useState(250);
//     const [characterOpacity, setCharacterOpacity] = useState(0);

//     // State for the button's fade-in/slide-up animation
//     const [buttonStyles, setButtonStyles] = useState({
//         opacity: 0,
//         transform: 'translateX(90px)', // Start 20px below its final position
//     });

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 992);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const { rive, RiveComponent } = useRive({
//         src: contactAnimationFile,
//         stateMachines: STATE_MACHINE_NAME,
//         autoplay: false,
//     });

//     const walkTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TRIGGER_NAME);

//     useEffect(() => {
//         if (!isAnimationTriggered) return;
        
//         if (rive && walkTriggerInput) {
//             // --- THIS IS THE FIX ---
//             // Un-pause the animation before firing the trigger
//             rive.play(); 
//             walkTriggerInput.fire();
//         }

//         const t = requestAnimationFrame(() => {
//             setCharacterOpacity(1);
//             setCharacterPositionX(0);
//             setButtonStyles({
//             opacity: 1,
//             transform: 'translateX(0)',
//         });
//         });

//         return () => cancelAnimationFrame(t);
//     }, [isAnimationTriggered, walkTriggerInput, rive]);

//     const handleMessageChange = (e) => {
//         const val = e.target.value;
//         setMessage(val);
//         if (!isAnimationTriggered && val.trim().length > 0) {
//             setIsAnimationTriggered(true);
//         }
//     };
    
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ name, email, message });
//         alert('Thank you for your message!');
//         setName('');
//         setEmail('');
//         setMessage('');
//     };

//     const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
//     const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
//     const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;


// return (


//     <div style={contactContainerStyle}>
//         {/* ... Left side Lottie animation ... */}
//         <div style={animationContainerStyle}>
//             <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//         </div>
//         <div style={formContainerStyle}>
//             <h1 style={styles.formContainerH1}>Get in Touch</h1>
//             <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>
//             <form onSubmit={handleSubmit} style={styles.contactForm}>
//                 {/* ... Input fields ... */}
//                 <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
//                 <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
//                 <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={handleMessageChange} required style={{ ...styles.input, ...styles.textarea }} /></div>
                    
//                 {/* --- UPDATED JSX STRUCTURE --- */}
//                 <div style={styles.animationClipContainer}>
//                     {/* Container for the character, slides in from the left */}
//                     <div style={{...styles.characterContainer, opacity: characterOpacity, transform: `translateX(${characterPositionX}px)`}}>
//                         <div style={{...styles.riveWrapper, visibility: isAnimationTriggered ? 'visible' : 'hidden'}}>
//                              <RiveComponent style={{ width: '100%', height: '100%' }} />
//                         </div>
//                     </div>
                        
//                     {/* The button is now a separate element, fades/slides up into place */}
//                     <button type="submit" style={{ ...styles.submitButton, ...buttonStyles }}>
//                         Send Message
//                     </button>
//                 </div>
//             </form>
//         </div>
//     </div>
//     );
// };

// export default ContactPage;



// import React, { useState, useEffect , useRef } from 'react';
// import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json';
// import contactAnimationFile from '/rive/contact_us.riv';

// // SVG Icon Components (No changes needed here)
// const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
// const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
// const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );
  
// const styles = {      
//     // ... (other styles remain the same)
//     contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//     animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//     lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//     formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//     formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//     formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//     contactForm: { width: '100%', maxWidth: '500px' },
//     inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//     inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//     input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//     textarea: { resize: 'vertical', minHeight: '120px' },

//     // --- MODIFIED STYLES ---
//     animationClipContainer: { position: 'relative', width: '100%', height: '100px', marginTop: '1rem' },
//     characterContainer: { position: 'absolute', top: -70, left: 100, height: '100px', display: 'flex', alignItems: 'center',   },
//     riveWrapper: { width: '500px', height: '500px' },
//     submitButton: {
//         position: 'absolute',
//         // This 'left' value is now critical. Adjust it to position the button
//         // exactly where the character's hand will be.
//         left: '300px',
//         top: '37px', // Adjust vertical position as needed
//         width: 'auto',
//         padding: '1rem 2.5rem',
//         fontSize: '1.1rem',
//         fontWeight: 600,
//         color: '#fff',
//         backgroundColor: '#1e1e2f',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         whiteSpace: 'nowrap',
//         // The button's own transition. It starts 200ms after the character starts moving
//         // and finishes at the same time.
//         transition: ' transform  linear 2000ms',
//     },
// };

// const STATE_MACHINE_NAME = 'State Machine 1';
// const TRIGGER_NAME = 'Trigger 1';

// const ContactPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//     const riveRef = useRef(null);
//     const [walkTriggerInput, setWalkTriggerInput] = useState(null);


//     // --- NEW STATE MANAGEMENT FOR ANIMATIONS ---
//     // State for the character's slide-in animation
//     const [characterPositionX, setCharacterPositionX] = useState(250);
//     const [characterOpacity, setCharacterOpacity] = useState(0);

//     // State for the button's fade-in/slide-up animation
//     const [buttonStyles, setButtonStyles] = useState({
//         opacity: 0,
//         transform: 'translateX(90px)', // Start 20px below its final position
//     });

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth <= 992);
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const { rive, RiveComponent } = useRive({
//         src: contactAnimationFile,
//         stateMachines: STATE_MACHINE_NAME,
//         autoplay: false,
//         onRiveLoad: (riveInstance) => {
//             riveRef.current = riveInstance;
//         }
        
//     });

//     // const walkTriggerInput = useStateMachineInput(rive, STATE_MACHINE_NAME, TRIGGER_NAME);
//     useEffect(() => {
//         if (rive) {
//             console.log("✅ Rive Loaded");

//             // 🔍 Print all inputs from your state machine
//             console.log("State Machine Inputs:", rive.stateMachineInputs(STATE_MACHINE_NAME));

//             const inputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
//             const trigger = inputs?.find(input => input.name === TRIGGER_NAME);

//             console.log("🎯 Found Trigger:", trigger);

//             setWalkTriggerInput(trigger); 
//         }
//     }, [rive]);

//     // --- UPDATED useEffect to control BOTH animations ---
//     useEffect(() => {
//         if (!rive || !walkTriggerInput) return; // safety check

//         if (isAnimationTriggered) {
//             // When triggered: play animation and fire state machine input
//             try {
//                 rive.play();
//                 walkTriggerInput.fire();
//             } catch (err) {
//                 console.warn("Failed to fire animation trigger:", err);
//             }

//             // Animate the character and button in
//             const timer = setTimeout(() => {
//                 setCharacterPositionX(0);
//                 setCharacterOpacity(1);
//                 setButtonStyles({
//                     opacity: 1,
//                     transform: 'translateY(0)',
//                 });
//             }, 50);

//             return () => clearTimeout(timer);
//         } else {
//             // When reset: return animation & elements to initial hidden state
//             try {
//                 rive.stop();
//             } catch (err) {
//                 console.warn("Failed to stop Rive:", err);
//             }

//             setCharacterPositionX(250);
//             setCharacterOpacity(0);
//             setButtonStyles({
//                 opacity: 0,
//                 transform: 'translateX(90px)',
//             });
//         }
//     }, [isAnimationTriggered, rive, walkTriggerInput]);


//     const handleMessageChange = (e) => {
//         const val = e.target.value;    
//         setMessage(val); 

//         // Trigger animation only when typing message for the first time (after reset)
//         if (!isAnimationTriggered && val.trim().length > 0) {
//             if (rive) {
//                 try {
//                     rive.play();

//                     // 🧠 Re-fetch inputs each time, in case Rive was reloaded
//                     const inputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
//                     const trigger = inputs?.find((i) => i.name === TRIGGER_NAME);
 
//                     if (walkTriggerInput) {
//                         walkTriggerInput.fire();
//                         setIsAnimationTriggered(true);
//                     } else {
//                         console.warn("Trigger not found — Rive may be resetting");
//                         // 🕐 Try again after a short delay
//                         setTimeout(() => {
//                             const retryInputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
//                             const retryTrigger = retryInputs?.find((i) => i.name === TRIGGER_NAME);
//                             if (retryTrigger) {
//                                 retryTrigger.fire();
//                                 setIsAnimationTriggered(true);
//                                 console.log("Trigger successfully fired after retry ✅");
//                             }
//                         }, 300);
//                     }
//                 } catch (err) {
//                     console.warn("Failed to fire animation trigger:", err);
//                 }
//             }
//         }
//         // if (val.length > 0 && !isAnimationTriggered) {

//         //     setIsAnimationTriggered(true);
//         //     if (rive && walkTriggerInput) {
//         //         try {
//         //         rive.play();
//         //         walkTriggerInput.fire();
//         //         } catch (err) {
//         //             console.warn("Failed to fire animation trigger:", err);
//         //         }
//         //     } else {
//         //         console.warn("Rive or walkTriggerInput not initialized.");
//         //     }
    
//         // }
//     };


    
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     console.log({ name, email, message });
//     //     alert('Thank you for your message!');
//     // };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ name, email, message });
//         alert("Thank you for your message!");

//         // Reset form fields
//         setName("");
//         setEmail("");
//         setMessage("");

//         // Reset UI animation states
//         setIsAnimationTriggered(false);
//         setCharacterPositionX(250);
//         setCharacterOpacity(0);
//         setButtonStyles({
//             opacity: 0,
//             transform: "translateX(90px)",
//         });

//         // ✅ Safely reset Rive animation instance
//         if (rive) {
//             try {
//             rive.stop();      // stop current animation cleanly
//             rive.play();      // restart the animation engine
//             console.log("Rive animation restarted cleanly");
//             } catch (err) {
//             console.warn("Rive reset skipped:", err);
//             }

//             // 🩵 Re-fetch trigger input after reset (this is crucial!)
//             setTimeout(() => {
//             const inputs = rive?.stateMachineInputs(STATE_MACHINE_NAME);
//             if (inputs) {
//                 console.log("Inputs reinitialized after reset");
//                 const walkTrigger = inputs.find((i) => i.name === "walk");
//                 if (walkTrigger) {
//                 console.log("Trigger found again:", walkTrigger.name);
//                 } else {
//                 console.warn("Trigger not found after reset — check Rive machine name");
//                 }
//             }
//             }, 400);
//         }
//     };




//     const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
//     const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
//     const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;

//     return (
//         <div style={contactContainerStyle}>
//             {/* ... Left side Lottie animation ... */}
//             <div style={animationContainerStyle}>
//                 <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//             </div>
//             <div style={formContainerStyle}>
//                 <h1 style={styles.formContainerH1}>Get in Touch</h1>
//                 <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>
//                 <form onSubmit={handleSubmit} style={styles.contactForm}>
//                     {/* ... Input fields ... */}
//                     <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={handleMessageChange} required style={{ ...styles.input, ...styles.textarea }} /></div>
                    
//                     {/* --- UPDATED JSX STRUCTURE --- */}
//                     <div style={styles.animationClipContainer}>
//                         {/* Container for the character, slides in from the left */}
//                         <div style={{...styles.characterContainer, opacity: characterOpacity, transform: `translateX(${characterPositionX}px)`}}>
//                             <div style={{...styles.riveWrapper, visibility: isAnimationTriggered ? 'visible' : 'hidden'}}>
//                                 <RiveComponent style={{ width: '100%', height: '100%' }} />
//                             </div>
//                         </div>
                        
//                         {/* The button is now a separate element, fades/slides up into place */}
//                         <button type="submit" style={{ ...styles.submitButton, ...buttonStyles }}>
//                             Send Message
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ContactPage;

// import React, { useState, useEffect, useMemo } from 'react';
// import { useRive } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json';
// import { riveAnimationDataBase64 } from '../riveAnimationData';

// // Helper function to decode the Base64 string into a file buffer
// function base64ToUint8Array(base64) {
//   const binaryString = atob(base64);
//   const len = binaryString.length;
//   const bytes = new Uint8Array(len);
//   for (let i = 0; i < len; i++) {
//     bytes[i] = binaryString.charCodeAt(i);
//   }
//   return bytes;
// }

// const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
// const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
// const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );

// const styles = {
//     contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//     animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//     lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//     formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//     formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//     formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//     contactForm: { width: '100%', maxWidth: '500px' },
//     inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//     inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//     input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//     textarea: { resize: 'vertical', minHeight: '120px' },
//     animationClipContainer: { position: 'relative', width: '100%', height: '100px', marginTop: '1rem' },
//     characterContainer: { position: 'absolute', top: -70, left: 100, height: '100px', display: 'flex', alignItems: 'center' },
//     riveWrapper: { width: '500px', height: '500px' },
//     submitButton: { position: 'absolute', left: '300px', top: '37px', width: 'auto', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 600, color: '#fff', backgroundColor: '#1e1e2f', border: 'none', borderRadius: '8px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'transform 700ms ease, opacity 500ms ease' },
// };

// const STATE_MACHINE_NAME = 'State Machine 1';
// const TRIGGER_NAME = 'Trigger 1';

// const ContactPage = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');
//     const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
//     const [characterPositionX, setCharacterPositionX] = useState(250);
//     const [characterOpacity, setCharacterOpacity] = useState(0);
//     const [buttonStyles, setButtonStyles] = useState({
//         opacity: 0,
//         transform: 'translateX(90px)',
//     });

//     // useMemo runs the decoding function only once, creating the buffer
//     const riveFileBuffer = useMemo(() => base64ToUint8Array(riveAnimationDataBase64), []);

//     const { rive, RiveComponent } = useRive({
//         file: riveFileBuffer, // Use the decoded buffer with the 'file' property
//         stateMachines: STATE_MACHINE_NAME,
//         autoplay: false,
//     });

//     // This effect controls all animation logic
//     useEffect(() => {
//         if (!rive) return;

//         if (isAnimationTriggered) {
//             const inputs = rive.stateMachineInputs(STATE_MACHINE_NAME);
//             if (inputs) {
//                 const trigger = inputs.find((i) => i.name === TRIGGER_NAME);
//                 if (trigger) {
//                     rive.play();
//                     trigger.fire();
//                     const timer = setTimeout(() => {
//                         setCharacterPositionX(0);
//                         setCharacterOpacity(1);
//                         setButtonStyles({ opacity: 1, transform: 'translateY(0)' });
//                     }, 50);
//                     return () => clearTimeout(timer);
//                 }
//             }
//         } else {
//             // Reset logic
//             rive.stop();
//             setCharacterPositionX(250);
//             setCharacterOpacity(0);
//             setButtonStyles({ opacity: 0, transform: 'translateX(90px)' });
//         }
//     }, [isAnimationTriggered, rive]);

//     const handleMessageChange = (e) => {
//         setMessage(e.target.value);
//         if (e.target.value.trim().length > 0 && !isAnimationTriggered) {
//             setIsAnimationTriggered(true);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log({ name, email, message });
//         alert("Thank you for your message!");
//         setName("");
//         setEmail("");
//         setMessage("");
//         setIsAnimationTriggered(false); // Reset animation state
//     };

//     return (
//         <div style={styles.contactContainer}>
//             <div style={styles.animationContainer}>
//                 <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//             </div>
//             <div style={styles.formContainer}>
//                 <h1 style={styles.formContainerH1}>Get in Touch</h1>
//                 <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>
//                 <form onSubmit={handleSubmit} style={styles.contactForm}>
//                     <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
//                     <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={handleMessageChange} required style={{ ...styles.input, ...styles.textarea }} /></div>
                    
//                     <div style={styles.animationClipContainer}>
//                         <div style={{...styles.characterContainer, opacity: characterOpacity, transform: `translateX(${characterPositionX}px)`}}>
//                             <div style={{...styles.riveWrapper, visibility: isAnimationTriggered ? 'visible' : 'hidden'}}>
//                                 <RiveComponent style={{ width: '100%', height: '100%' }} />
//                             </div>
//                         </div>
//                         <button type="submit" style={{ ...styles.submitButton, ...buttonStyles }}>
//                             Send Message
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ContactPage;


// import React, { useState, useEffect, useRef } from 'react';
// import { useRive } from '@rive-app/react-canvas';
// import Lottie from 'lottie-react';

// import contactLottieJson from '../assets/Contact Us.json';
// import contactAnimationFile from '/rive/contact_us.riv';

// // SVGs (unchanged)
// const UserIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg> );
// const EnvelopeIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg> );
// const PenIcon = ({ style }) => ( <svg style={style} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 384H88v40z"></path></svg> );


// const styles = {
//   /* same styles you already had; omitted here to keep the snippet compact */
//   contactContainer: { display: 'flex', width: '100%', minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" },
//   animationContainer: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1e1e2f', padding: '2rem', position: 'relative', overflow: 'hidden' },
//   lottieAnimation: { width: '100%', height: '100%', maxWidth: '500px', maxHeight: '500px' },
//   formContainer: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', backgroundColor: '#fff', overflow: 'hidden' },
//   formContainerH1: { fontSize: '2.5rem', color: '#1e1e2f', marginBottom: '0.5rem', fontWeight: 700 },
//   formContainerP: { fontSize: '1.1rem', color: '#6c757d', marginBottom: '2.5rem' },
//   contactForm: { width: '100%', maxWidth: '500px' },
//   inputGroup: { position: 'relative', marginBottom: '1.5rem' },
//   inputIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#adb5bd' },
//   input: { width: '100%', padding: '1rem 1rem 1rem 2.5rem', fontSize: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', backgroundColor: '#f7f9fc', color: '#333', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' },
//   textarea: { resize: 'vertical', minHeight: '120px' },
//   animationClipContainer: { position: 'relative', width: '100%', height: '100px', marginTop: '1rem' },
//   characterContainer: { position: 'absolute', top: -70, left: 100, height: '100px', display: 'flex', alignItems: 'center' },
//   riveWrapper: { width: '500px', height: '500px' },
//   submitButton: {
//     position: 'absolute',
//     left: '300px',
//     top: '37px',
//     width: 'auto',
//     padding: '1rem 2.5rem',
//     fontSize: '1.1rem',
//     fontWeight: 600,
//     color: '#fff',
//     backgroundColor: '#1e1e2f',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',    
//     whiteSpace: 'nowrap',
//     transition: 'transform 2000ms linear',  
//   },
// };

// const STATE_MACHINE_NAME = 'State Machine 1';
// // IMPORTANT: set this to the exact name of the trigger in the Rive state machine
// const TRIGGER_NAME = 'walk';

// export default function ContactPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [isAnimationTriggered, setIsAnimationTriggered] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
//   const riveRef = useRef(null);

//   // UI-only animation states
//   const [characterPositionX, setCharacterPositionX] = useState(250);
//   const [characterOpacity, setCharacterOpacity] = useState(0);
//   const [buttonStyles, setButtonStyles] = useState({ opacity: 0, transform: 'translateX(90px)' });

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 992);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Initialize rive and store instance on load into riveRef
//   const { rive, RiveComponent } = useRive({
//     src: contactAnimationFile,
//     stateMachines: STATE_MACHINE_NAME,
//     autoplay: false,
//     onRiveLoad: (instance) => {
//       riveRef.current = instance;
//       console.log('Rive loaded -> riveRef set');
//     },
//   });

//   // SAFER approach: poll for the trigger on the rive instance and call fire() only when available.
//   const safeFireTrigger = (attempts = 30, delay = 150) => {
//     const tryFire = (remaining) => {
//       const rv = riveRef.current;
//       if (!rv) {
//         if (remaining > 0) return setTimeout(() => tryFire(remaining - 1), delay);
//         console.warn('safeFireTrigger: rive instance not available after retries.');
//         return;
//       }

//       const inputs = rv.stateMachineInputs(STATE_MACHINE_NAME) || [];
//       const trigger = inputs.find((i) => i && i.name === TRIGGER_NAME);

//       if (trigger && typeof trigger.fire === 'function') {
//         try {
//           trigger.fire();
//           console.log(`safeFireTrigger: fired "${TRIGGER_NAME}"`);
//           return;
//         } catch (err) {
//           console.warn('safeFireTrigger: trigger.fire() threw:', err);
//         }
//       }

//       if (remaining > 0) {
//         setTimeout(() => tryFire(remaining - 1), delay);
//       } else {
//         console.warn(`safeFireTrigger: trigger "${TRIGGER_NAME}" not found after retries. Inputs:`, inputs.map(i => i?.name));
//       }
//     };

//     tryFire(attempts);
//   };

//   // When animation flag toggles, play rive and animate UI parts
//   useEffect(() => {
//     if (isAnimationTriggered) {
//       try { rive?.play(); } catch (e) { console.warn('rive.play() error', e); }
//       // Use the safe dynamic firing method (do NOT call hook.fire directly)
//       safeFireTrigger();

//       const timer = setTimeout(() => {
//         setCharacterPositionX(0);
//         setCharacterOpacity(1);
//         setButtonStyles({ opacity: 1, transform: 'translateX(0)' });
//       }, 50);

//       return () => clearTimeout(timer);
//     } else {
//       try { rive?.stop(); } catch (e) { /* ignore */ }
//       setCharacterPositionX(250);
//       setCharacterOpacity(0);
//       setButtonStyles({ opacity: 0, transform: 'translateX(90px)' });
//     }
//   }, [isAnimationTriggered, rive]);

//   const handleMessageChange = (e) => {
//     const val = e.target.value;
//     setMessage(val);

//     if (val.length > 0 && !isAnimationTriggered) {
//       // flip the UI flag; safeFireTrigger will wait for the Rive instance to be ready
//       setIsAnimationTriggered(true);
//       safeFireTrigger();
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ name, email, message });
//     alert('Thank you for your message!');
//     // Reset fields
//     setName('');
//     setEmail('');
//     setMessage('');
//     setIsAnimationTriggered(false);

//     if (riveRef.current) {
//       try {
//         riveRef.current.stop();
//         setTimeout(() => {
//           const inputs = riveRef.current?.stateMachineInputs(STATE_MACHINE_NAME);
//           console.log('Post-reset inputs:', inputs?.map(i => i?.name));
//         }, 300);
//       } catch (err) {
//         console.warn('Rive reset failed:', err);
//       }
//     }
//   };

//   const contactContainerStyle = isMobile ? { ...styles.contactContainer, flexDirection: 'column' } : styles.contactContainer;
//   const animationContainerStyle = isMobile ? { ...styles.animationContainer, minHeight: '400px', flex: 'auto' } : styles.animationContainer;
//   const formContainerStyle = isMobile ? { ...styles.formContainer, padding: '2.5rem' } : styles.formContainer;

//   return (
//     <div style={contactContainerStyle}>
//       <div style={animationContainerStyle}>
//         <Lottie animationData={contactLottieJson} loop={true} autoplay={true} style={styles.lottieAnimation} />
//       </div>

//       <div style={formContainerStyle}>
//         <h1 style={styles.formContainerH1}>Get in Touch</h1>
//         <p style={styles.formContainerP}>We'd love to hear from you. Please fill out this form.</p>

//         <form onSubmit={handleSubmit} style={styles.contactForm}>
//           <div style={styles.inputGroup}><UserIcon style={styles.inputIcon} /><input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} /></div>
//           <div style={styles.inputGroup}><EnvelopeIcon style={styles.inputIcon} /><input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} /></div>
//           <div style={styles.inputGroup}><PenIcon style={styles.inputIcon} /><textarea placeholder="Your Message" value={message} onChange={handleMessageChange} required style={{ ...styles.input, ...styles.textarea }} /></div>

//           <div style={styles.animationClipContainer}>
//             {/* KEEP the Rive component mounted always (do not hide/unmount it) */}
//             <div style={{ ...styles.characterContainer, opacity: characterOpacity, transform: `translateX(${characterPositionX}px)`, transition: 'transform 600ms cubic-bezier(.2,.9,.2,1), opacity 400ms linear' }}>
//               <div style={styles.riveWrapper}>
//                 <RiveComponent style={{ width: '100%', height: '100%' }} />
//               </div>
//             </div>

//             <button type="submit" style={{ ...styles.submitButton, ...buttonStyles }}>
//               Send Message
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import Lottie from 'react-lottie-player';

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
        alert('Thank you for your message!');

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

