import ChromaGrid from "@/components/motion/ChromaGrid";

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
    <div className="flex flex-col gap-2">
      <h1 className="font-sans text-3xl p-4">Get to Know Our Team</h1>
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
