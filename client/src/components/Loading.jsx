import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Writing.json';

const overlay = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.45)', // darker backdrop for contrast
  backdropFilter: 'blur(6px)',
  opacity: 0,
  transition: 'opacity 360ms ease, transform 360ms ease',
  zIndex: 9999,
  pointerEvents: 'none',
};

const box = {
  background: 'rgba(255,255,255,0.98)',
  width: 'min(44vmin, 360px)', // responsive size
  height: 'min(44vmin, 360px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '18px',
  borderRadius: '16px',
  transform: 'scale(0.86)',
  transition: 'transform 360ms cubic-bezier(.2,.9,.25,1), opacity 360ms ease',
  boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
  border: '1px solid rgba(0,0,0,0.06)',
};

const lottieStyle = {
  width: '100%',
  height: '100%',
  maxWidth: '280px',
  maxHeight: '280px',
};

const labelStyle = {
  marginTop: '8px',
  fontSize: '13px',
  color: '#333',
  opacity: 0.9,
  textAlign: 'center',
};

export default function Loading({ visible = true, loop = true, label = 'Loading…' }) {
  const [isShowing, setIsShowing] = useState(visible);

  useEffect(() => {
    if (visible) {
      // show immediately
      setIsShowing(true);
    } else {
      // wait for exit transition before unmounting
      const timer = setTimeout(() => setIsShowing(false), 380);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!isShowing && !visible) return null;

  return (
    <div
      style={{
        ...overlay,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
      role="status"
      aria-label="Loading"
      aria-hidden={!visible}
    >
      <div
        style={{
          ...box,
          transform: visible ? 'scale(1)' : 'scale(0.86)',
          opacity: visible ? 1 : 0.85,
        }}
      >
        <Lottie
          animationData={animationData}
          loop={loop}
          style={lottieStyle}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
          }}
        />
        {label ? <div style={labelStyle}>{label}</div> : null}
      </div>
    </div>
  );
}