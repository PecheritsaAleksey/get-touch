import Image from "next/image";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TikTokIcon,
  TwitterIcon,
  VkIcon,
  YouTubeIcon,
} from "./components/Icons";

import { get } from "@vercel/edge-config";
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic',
  runtime = 'edge';

function LinkCard({
  href,
  title,
  image,
}: {
  href: string;
  title: string;
  image?: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center p-1 w-full rounded-md hover:scale-105 transition-all bg-gray-100 mb-3 max-w-3xl"
    >
      <div className="flex text-center w-full">
        <div className="w-10 h-10">
          {image && (
            <Image
              className="rounded-sm w-10 h-10 object-cover"
              alt={title}
              src={image}
              width={40}
              height={40}
            />
          )}
        </div>
        <h2 className="flex justify-center items-center font-semibold w-full text-gray-700 -ml-10]">
          {title}
        </h2>
      </div>
    </a>
  );
}

interface Link {
  name: string;
  avatar: string;
  socials: {
    title: string;
    href: string;
  }[];
  links: {
    href: string;
    title: string;
    image?: string;
  }[];
}

export default async function Home() {
  const data: Link | undefined = await get("get-touch");

  if (!data) {
    redirect("https://t.me/pecheritsa_dev");
  }

  return (
    <div className="flex items-center flex-col justify-center mx-auto w-full mt-16 px-8">
      <Image
        className="rounded-full overflow-hidden w-24 h-24 object-cover"
        loading="eager"
        priority={true}
        alt={data.name}
        src={data.avatar}
        width={80}
        height={80}
      />
      <h1 className="font-bold mt-4 mb-8 text-xl text-white">{data.name}</h1>
      {data.links.map((link) => {
        return <LinkCard key={link.href} {...link} />;
      })}
      <div className="flex items-center gap-4 mt-8 text-white">
        {data.socials.map((social) => (
          <a
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.href.includes("twitter") ? (
              <TwitterIcon />
            ) : social.href.includes("instagram") ? (
              <InstagramIcon />
            ) : social.href.includes("linkedin") ? (
              <LinkedinIcon />
            ) : social.href.includes("vk") ? (
              <VkIcon />
            ) : social.href.includes("t.me") ? (
              <TelegramIcon />
            ) : social.href.includes("youtube") ? (
              <YouTubeIcon />
            ) : social.href.includes("tiktok") ? (
              <TikTokIcon />
            ) : social.href.includes("github") ? (
              <GithubIcon />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
