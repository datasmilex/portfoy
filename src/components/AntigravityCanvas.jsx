import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const ALL_BADGES = [
  { label: 'Lua (Expert)', color: '#000080', border: '#3B82F6', type: 'core', shape: 'pill' },
  { label: 'Flutter', color: '#02569B', border: '#38BDF8', type: 'mobile', shape: 'pill' },
  { label: 'Supabase', color: '#3ECF8E', border: '#10B981', type: 'saas', shape: 'pill' },
  { label: 'Vercel', color: '#000000', border: '#F43F5E', type: 'web', shape: 'pill' },
  { label: 'Roblox Dev', color: '#E11D48', border: '#FB7185', type: 'game', shape: 'card' },
  { label: 'The Pier', color: '#1E1B4B', border: '#8B5CF6', type: 'horror', shape: 'card' },
  { label: 'YDCO Obby', color: '#881337', border: '#F43F5E', type: 'meta', shape: 'card' },
  { label: 'Figma', color: '#F24E1E', border: '#A855F7', type: 'design', shape: 'pill' },
  { label: 'Blender 3D', color: '#EA580C', border: '#F97316', type: '3d', shape: 'pill' },
  { label: 'Generative AI', color: '#4C1D95', border: '#C084FC', type: 'ai', shape: 'pill' },
  { label: 'Muzikors', color: '#0369A1', border: '#06B6D4', type: 'saas', shape: 'card' },
  { label: 'Photoshop', color: '#31A8FF', border: '#00C8FF', type: 'design', shape: 'pill' },
  { label: 'Video Editör', color: '#9999FF', border: '#A855F7', type: 'media', shape: 'pill' },
];

export default function AntigravityCanvas({ isGravityOn }) {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const badgeBodiesRef = useRef([]);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    // Use reduced badge set on mobile for 60 FPS performance
    const activeBadges = isMobile ? ALL_BADGES.slice(0, 5) : ALL_BADGES;

    const Engine = Matter.Engine,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body;

    const engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engineRef.current = engine;

    // Create Canvas with pointer-events: none & touch-action: pan-y (Fixes touchscreen scroll hijacking)
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.touchAction = 'pan-y';
    canvas.style.zIndex = '0';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Outer Boundaries
    const wallOptions = { isStatic: true, restitution: 0.8, friction: 0.1 };
    const thickness = 100;
    const floor = Bodies.rectangle(width / 2, height + thickness / 2 - 10, width * 2, thickness, wallOptions);
    const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -thickness / 2, width * 2, thickness, wallOptions);

    // Static Exclusion Zone
    const textExclusionZone = Bodies.rectangle(width / 2, height * 0.35, Math.min(650, width * 0.85), 240, {
      isStatic: true,
      restitution: 0.9,
    });

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, textExclusionZone]);

    // Create physics bodies
    const badgeBodies = activeBadges.map((b, i) => {
      const isCard = b.shape === 'card';
      const w = isMobile ? (isCard ? 110 : 95) : (isCard ? 130 : 110);
      const h = isMobile ? (isCard ? 38 : 32) : (isCard ? 45 : 36);

      const isRightSide = i % 2 === 0;
      const x = isMobile
        ? Math.random() * (width - 120) + 60
        : (isRightSide
          ? Math.random() * (width * 0.28) + width * 0.7
          : Math.random() * (width * 0.28) + 40);
      const y = Math.random() * (height * 0.5) + 60;

      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.018,
        angle: (Math.random() - 0.5) * 0.4,
      });

      body.customData = { ...b, width: w, height: h };

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5,
      });

      return body;
    });

    badgeBodiesRef.current = badgeBodies;
    World.add(engine.world, badgeBodies);

    // Mouse/Touch Position Tracking
    const mousePos = { x: -1000, y: -1000, active: false };
    const mouseTrail = [];

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
        mousePos.active = true;
      }
    };

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.active = true;

      if (!isMobile && Math.random() < 0.5) {
        mouseTrail.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 1.5,
          alpha: 0.8,
          color: Math.random() > 0.5 ? '#8B5CF6' : '#06B6D4',
        });
      }
    };

    const handleLeave = () => {
      mousePos.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleLeave, { passive: true });

    // Starfield particles (reduced count on mobile for performance)
    const starCount = isMobile ? 35 : 80;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.005 + 0.002,
    }));

    let animationFrameId;

    const renderLoop = () => {
      Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, width, height);

      // Starfield
      stars.forEach((star) => {
        if (mousePos.active) {
          const dx = star.x - mousePos.x;
          const dy = star.y - mousePos.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            star.x += (dx / dist) * force * 1.4;
            star.y += (dy / dist) * force * 1.4;
          }
        }

        star.alpha += Math.sin(Date.now() * star.speed) * 0.01;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(0.65, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Repulsion from text column
      const centerX = width / 2;
      badgeBodies.forEach((body) => {
        const distFromCenter = Math.abs(body.position.x - centerX);
        if (distFromCenter < 240 && !isGravityOn) {
          const pushDirection = body.position.x > centerX ? 1 : -1;
          Body.applyForce(body, body.position, {
            x: pushDirection * 0.00025,
            y: (Math.random() - 0.5) * 0.0001,
          });
        }
      });

      // Mouse Fluid Force
      if (mousePos.active) {
        badgeBodies.forEach((body) => {
          const dx = body.position.x - mousePos.x;
          const dy = body.position.y - mousePos.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 150 && dist > 1) {
            const forceMagnitude = (150 - dist) * 0.00006;
            Body.applyForce(body, body.position, {
              x: (dx / dist) * forceMagnitude,
              y: (dy / dist) * forceMagnitude,
            });
          }
        });
      }

      // Mouse Trail
      for (let i = mouseTrail.length - 1; i >= 0; i--) {
        const p = mouseTrail[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;

        if (p.alpha <= 0) {
          mouseTrail.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // Render Badges
      badgeBodies.forEach((body) => {
        const { x, y } = body.position;
        const angle = body.angle;
        const { label, border, shape, width: bW, height: bH } = body.customData;

        const isNearCenter = Math.abs(x - centerX) < 280;
        const alpha = isNearCenter ? 0.3 : (isMobile ? 0.45 : 0.55);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.globalAlpha = alpha;

        const r = shape === 'pill' ? bH / 2 : 8;

        if (!isMobile) {
          ctx.shadowColor = border;
          ctx.shadowBlur = 8;
        }

        ctx.fillStyle = 'rgba(12, 12, 18, 0.88)';
        ctx.strokeStyle = border;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.roundRect(-bW / 2, -bH / 2, bW, bH, r);
        ctx.fill();
        ctx.stroke();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        ctx.fillStyle = border;
        ctx.beginPath();
        ctx.arc(-bW / 2 + 12, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 ${isMobile ? '10px' : (shape === 'card' ? '12px' : '11px')} Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 4, 1);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      Body.setPosition(floor, { x: width / 2, y: height + thickness / 2 - 10 });
      Body.setPosition(rightWall, { x: width + thickness / 2, y: height / 2 });
      Body.setPosition(textExclusionZone, { x: width / 2, y: height * 0.35 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleLeave);
      World.clear(engine.world, false);
      Engine.clear(engine);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const Body = Matter.Body;

    if (isGravityOn) {
      engine.world.gravity.y = 1.1;
    } else {
      engine.world.gravity.y = 0;
      badgeBodiesRef.current.forEach((body) => {
        Body.setVelocity(body, {
          x: body.velocity.x * 0.4 + (Math.random() - 0.5) * 1.5,
          y: -2.5 - Math.random() * 2.0,
        });
      });
    }
  }, [isGravityOn]);

  return <div ref={sceneRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none touch-pan-y" />;
}
