import ChromaGrid from "@/components/motion/ChromaGrid";
import GradientText from "@/components/motion/GradientText";
import { getTranslations } from "next-intl/server";

const Contacts = async () => {
  const t = await getTranslations("pages.ContactsPage");

  const items = [
    {
      image: "/team/pug.jpg",
      title: "Tim",
      subtitle: t("team.tim.subtitle"),
      handle: "@gierszal",
      borderColor: "#008f07",
      gradient: "linear-gradient(145deg, #0230c9, #2f0da8)",
      url: "https://github.com/gierszal",
    },
    {
      image: "/team/coffee.webp",
      title: t("team.coffee.name"),
      subtitle: t("team.coffee.subtitle"),
      handle: "@cup_of_cofee",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://example.com",
    },
  ];

  return (
    <div className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        {t("heading")}
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
