// import React from "react";
// import "./homePage.css";
// import SearchBar from "../../components/searchBar/SearchBar";
// import bg from "../../../public/bg.png";
// function HomePage() {
//   return (
//     <>
//       <div className="homePage">
//         <div className="textContainer">
//           <div className="wrapper">
//             <h1 className="title">Discover Your Ideal Home..!</h1>
//             <span>Welcome to Dream Homes! 
//                   Ready to find your dream home? Browse our stunning listings and discover the perfect place to call your own. Whether buying, selling, or renting, our expert team is here to help you every step of the way. Start your journey with Dream Homes today!
//             </span>
//             <SearchBar />
//             <div className="boxes">
//               <div className="box b1">
//                 <h1>16+</h1>
//                 <h2>Years of Experience</h2>
//               </div>
//               <div className="box b2">
//                 <h1>100+</h1>
//                 <h2>Award Gained</h2>
//               </div>
//               <div className="box b3">
//                 <h1>2000+</h1>
//                 <h2>Properties Ready</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="imgContainer">
//           <img src={bg} alt="" />
//         </div>
//       </div>
//     </>
//   );
// }
// export default HomePage;










import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from 'three';
import SearchBar from "../../components/searchBar/SearchBar";
import { ChevronDown } from 'lucide-react';

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 text-white overflow-hidden">
      <div id="three-container" className="absolute inset-0 opacity-30" />
      <div className="relative container mx-auto px-4 py-24 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
            Discover Luxury
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Welcome to Dream Homes, where your perfect sanctuary awaits. Immerse yourself in unparalleled elegance and comfort.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SearchBar />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.2 }}
        >
          {[
            { number: "16+", text: "Years of Excellence" },
            { number: "100+", text: "Prestigious Awards" },
            { number: "2000+", text: "Luxury Properties" },
          ].map((box, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-indigo-300 mb-2">{box.number}</h2>
              <p className="text-indigo-100">{box.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={{ y, opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-indigo-200"
        >
          <ChevronDown size={48} className="animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}

