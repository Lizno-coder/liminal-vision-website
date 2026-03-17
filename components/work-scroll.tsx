"use client";

import React from "react";
import { BenefitsList, defaultBenefits } from "@/components/ui/category-list";

export function WorkScrollSection() {
  return (
    <section id="work">
      <BenefitsList benefits={defaultBenefits} />
    </section>
  );
}
