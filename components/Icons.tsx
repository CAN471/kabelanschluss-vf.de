import {
  Cable,
  CircleCheck,
  Gauge,
  House,
  Laptop,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircle,
  Network,
  PhoneCall,
  Plug,
  RadioTower,
  Router,
  ServerCog,
  ShieldCheck,
  Signal,
  Smartphone,
  Sparkles,
  Tv,
  Waves,
  Wifi,
  type LucideIcon,
  type LucideProps
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  fiber: Waves,
  coax: Cable,
  node: Network,
  amplifier: Gauge,
  hup: ServerCog,
  outlet: Plug,
  router: Router,
  wifi: Wifi,
  home: House,
  phone: Smartphone,
  tv: Tv,
  laptop: Laptop,
  pin: MapPin,
  callback: PhoneCall,
  advice: MessageCircle,
  shield: ShieldCheck,
  check: CircleCheck,
  signal: Signal,
  radio: RadioTower,
  mail: Mail,
  idea: Lightbulb,
  recommendation: Sparkles
};

export function Icon({ name, ...props }: LucideProps & { name: string }) {
  const Component = icons[name] ?? RadioTower;
  return <Component aria-hidden="true" focusable="false" strokeWidth={1.8} {...props} />;
}
