// useGSAP(() => {
//   const header = headerRef.current
//   const bg = bgRef.current
//   const logo = logoRef.current
//   const trigger = triggerRef.current

//   if (!header || !bg || !logo || !trigger) return

//   // const animateY = gsap.quickTo(header, "y", {
//   //   duration: 0.8,
//   //   ease: "power3.out",
//   // })

//   gsap.to(header, {
//     height: "2.5rem",
//     duration: 0.2,
//     ease: "power2.inOut",
//     scrollTrigger: {
//       trigger: trigger,
//       start: "top top",
//       end: "+=100",
//       scrub: true,
//       markers: true,
//     },
//   })
//   gsap.to(logo, {
//     scale: 0.7,
//     duration: 0.2,
//     ease: "power2.inOut",
//     scrollTrigger: {
//       trigger: trigger,
//       start: "top top",
//       end: "+=100",
//       scrub: true,
//       markers: true,
//     },
//   })

//   let lastScroll = window.scrollY

//   const handleScroll = () => {
//     const currentScroll = window.scrollY
//     const fullViewportHeight = window.innerHeight
//     const isMobile = window.innerWidth < 768

//     if (!isMobile) {
//       gsap.to(bg, {
//         opacity: currentScroll > 30 ? 1 : 0,
//         duration: 0.4,
//         ease: "power1.out",
//       })
//     } else if (isMobile && !menuOpen) {
//       gsap.to(bg, {
//         opacity: currentScroll > 30 ? 1 : 0,
//         duration: 0.4,
//         ease: "power1.out",
//       })
//     }

//     if (!isMobile) {
//       // if (currentScroll > lastScroll && currentScroll > fullViewportHeight) {
//       if (currentScroll > fullViewportHeight) {
//         // animateY(-100)
//         gsap.to(header, {
//           height: "2.5rem",
//           duration: 0.2,
//           scrub: true,
//           ease: "power2.inOut",
//         })
//         gsap.to(logoRef.current, {
//           scale: 0.7,
//           duration: 0.2,
//           ease: "power2.inOut",
//         })
//       } else {
//         // animateY(0)
//         gsap.to(header, {
//           height: "3.5rem",
//           duration: 0.2,
//           scrub: true,
//           ease: "power2.inOut",
//         })
//         gsap.to(logoRef.current, {
//           scale: 1,
//           duration: 0.2,
//           ease: "power2.inOut",
//         })
//       }
//     }

//     lastScroll = currentScroll <= 0 ? 0 : currentScroll
//     setLastScrollTop(lastScroll)
//   }

//   window.addEventListener("scroll", handleScroll)
//   return () => window.removeEventListener("scroll", handleScroll)
// }, [triggerRef.current])
