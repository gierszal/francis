import ChromaGrid from "@/components/motion/ChromaGrid";
import GradientText from "@/components/motion/GradientText";

const items = [
  {
    image: "/team/pug.jpg",
    title: "Tim",
    subtitle: "Student of SP 2026",
    handle: "@gierszal",
    borderColor: "#008f07",
    gradient: "linear-gradient(145deg, #0230c9, #2f0da8)",
    url: "https://github.com/gierszal",
  },
  {
    image: "/team/coffee.webp",
    title: "Cup of Cofee",
    subtitle: "Main Contributor",
    handle: "@cup_of_cofee",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://example.com",
  },
];

const Contacts = () => {
  return (
    <div className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Get to Know Our Team
      </GradientText>
      <div
        style={{
          height: "h-full",
          position: "relative",
        }}
      >
        <ChromaGrid
          items={items}
          radius={200}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </div>
  );
};

export default Contacts;
