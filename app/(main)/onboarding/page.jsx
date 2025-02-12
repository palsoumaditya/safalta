import React from "react";
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import { getUserOnboardingStatus } from "@/actions/user";
import OnboardingForm from "./_components/OnboardingForm";

const Onboarding = async () => {
  const { isOnboarded } = await getUserOnboardingStatus();
  if (isOnboarded) redirect("/dashboard");

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default Onboarding;
