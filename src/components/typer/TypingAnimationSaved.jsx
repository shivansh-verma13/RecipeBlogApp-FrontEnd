import { TypeAnimation } from "react-type-animation";

const TypingAnimationSaved = () => {
  return (
    <TypeAnimation
      preRenderFirstString={true}
      sequence={[
        500,
        "Your Saved Recipes...",
        1000,
        "Made For You...",
        2000,
        "By You!!",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "40px",
        color: "#000",
        // marginTop: "20px",
        marginBottom: 0,
        padding: "20px",
        display: "inline-block",
        textShadow: "0.5px 0.5px 10px #7F5283",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnimationSaved;
