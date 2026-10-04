import { Icon } from "@/components/Icons";
import type { GuidePage } from "@/lib/site";

type Motif = "rings" | "strands" | "radar" | "bars" | "speech" | "waves";

const coverStyles: Record<string, { tone: "night" | "red" | "sand"; motif: Motif }> = {
  "wie-funktioniert-kabel-internet": { tone: "night", motif: "rings" },
  "wie-funktioniert-glasfaser": { tone: "night", motif: "strands" },
  "kabel-oder-glasfaser": { tone: "sand", motif: "strands" },
  "vodafone-verfuegbarkeit-pruefen": { tone: "sand", motif: "radar" },
  "internet-tarif-waehlen": { tone: "red", motif: "bars" },
  "vodafone-beratung-statt-hotline": { tone: "red", motif: "speech" },
  "internet-mobilfunk-tv-kombinieren": { tone: "night", motif: "waves" },
  "glasfaser-in-wietze-celle-und-umgebung": { tone: "sand", motif: "radar" }
};

function MotifArt({ motif }: { motif: Motif }) {
  if (motif === "rings") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[132, 104, 80, 54, 22].map((r, index) => (
          <circle key={r} cx="300" cy="150" r={r} className={`m-ring m-ring-${index}`} />
        ))}
      </svg>
    );
  }
  if (motif === "strands") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <path
            key={index}
            className="m-strand"
            style={{ animationDelay: `${index * -0.45}s` }}
            d={`M-20 ${70 + index * 22} C 120 ${40 + index * 26}, 220 ${200 - index * 14}, 420 ${110 + index * 12}`}
          />
        ))}
      </svg>
    );
  }
  if (motif === "radar") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[40, 80, 120, 160].map((r) => (
          <circle key={r} cx="290" cy="160" r={r} className="m-radar" />
        ))}
        <circle cx="290" cy="160" r="9" className="m-radar-core" />
      </svg>
    );
  }
  if (motif === "bars") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {[60, 95, 140, 190, 240].map((h, index) => (
          <rect key={h} x={190 + index * 36} y={260 - h} width="22" height={h} rx="11" className="m-bar" style={{ animationDelay: `${index * 0.12}s` }} />
        ))}
      </svg>
    );
  }
  if (motif === "speech") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="m-bubble" d="M196 70h150a26 26 0 0 1 26 26v62a26 26 0 0 1-26 26h-88l-34 28v-28h-28a26 26 0 0 1-26-26V96a26 26 0 0 1 26-26Z" />
        <path className="m-bubble m-bubble-b" d="M150 160h96a22 22 0 0 1 22 22v40a22 22 0 0 1-22 22h-58l-24 20v-20h-14a22 22 0 0 1-22-22v-40a22 22 0 0 1 22-22Z" />
        {[0, 1, 2].map((index) => (
          <circle key={index} className="m-typing" cx={250 + index * 24} cy="127" r="7" style={{ animationDelay: `${index * 0.18}s` }} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2, 3].map((index) => (
        <path key={index} className="m-wave" style={{ animationDelay: `${index * 0.5}s` }} d={`M250 150 m-${40 + index * 34} 0 a ${40 + index * 34} ${40 + index * 34} 0 0 1 ${80 + index * 68} 0`} />
      ))}
      <circle cx="250" cy="150" r="10" className="m-radar-core" />
    </svg>
  );
}

export function GuideCover({ guide, size = "md" }: { guide: GuidePage; size?: "md" | "lg" }) {
  const style = coverStyles[guide.slug] ?? { tone: "night", motif: "strands" as Motif };
  return (
    <div className={`gcover gcover-${style.tone} gcover-${size}`}>
      <MotifArt motif={style.motif} />
      <span className="gcover-icon"><Icon name={guide.icon} /></span>
      <span className="gcover-tag">{guide.category}</span>
    </div>
  );
}
