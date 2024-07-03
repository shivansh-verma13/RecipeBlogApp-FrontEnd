import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <TypeAnimation
      preRenderFirstString={true}
      sequence={[
        500,
        "Your Very Own Recipe Blog...",
        1000,
        "Explore Different Recipes...", // initially rendered starting point
        1000,
        "Made By You All...",
        2000,
        "For You All!!",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "#000",
        // marginTop: "20px",
        marginBottom: 0,
        padding: '20px',
        display: "inline-block",
        textShadow: "0.5px 0.5px 10px #7F5283",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;
