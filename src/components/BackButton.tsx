"use client";

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BackButton = ({ title, className, variant }: Props) => {
  const router = useRouter();

  return (
    <Button
      title={title}
      className={className}
      variant={variant}
      onClick={() => router.back()}
    >
      <ArrowLeft />
      {title}
    </Button>
  );
};
