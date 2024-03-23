import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { textVariant, fadeIn } from '../utils/motion';
import { Tilt } from 'react-tilt';

const ServiceCard = ({ index, name, icon, isMobile }) => {
  return (
    <Tilt className={isMobile ? 'w-full' : 'w-full xs:w-[250px]'}>
      <motion.div
        variants={isMobile ? {} : fadeIn('right', 'spring', index * 0.5, 0.75)}
        className={`${
          isMobile ? 'xs:w-full' : 'xs:w-[250px]'
        } green-pink-gradient p-[1px] rounded-[20px] shadow-card`}
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[250px] flex justify-evenly items-center flex-col'
        >
          <img src={icon} alt='web-development' className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{name}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const Tech = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <motion.div variants={isMobile ? {} : textVariant()} >
        <p className={styles.sectionSubText}>What I know so Far</p>
        <h2 className={styles.sectionHeadText}>Technologies</h2>
      </motion.div>
      <div className={`mt-20 flex flex-wrap gap-10 ${isMobile ? 'flex-col' : ''}`}>
        {technologies.map((technology, index) => (
          <ServiceCard key={technology.name} index={index} {...technology} isMobile={isMobile} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, '');
