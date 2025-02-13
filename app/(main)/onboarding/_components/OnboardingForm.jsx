"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { onboardingSchema } from "../../../lib/schema";
import { industries } from "@/data/industries"; 

const OnboardingForm = () => {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  // Watch selected industry
  const industryValue = watch("industry");

  // Find selected industry details
  const selectedIndustryData = industries.find((ind) => ind.id === industryValue);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Example: Send data to API or navigate
    // router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Industry Select */}
            <div className="space-y-2">
              <label htmlFor="industry">Industry</label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(value);
                  setValue("subIndustry", ""); // Reset subIndustry when industry changes
                }}
              >
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select an Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem value={ind.id} key={ind.id}>
                      {ind.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("industry")} />
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry.message}</p>
              )}
            </div>

            {/* SubIndustry Select */}
            <div className="space-y-2 mt-4">
              <label htmlFor="subIndustry">Subindustry</label>
              <Select
                disabled={!selectedIndustryData} // Disable if no industry is selected
                onValueChange={(value) => setValue("subIndustry", value)}
              >
                <SelectTrigger id="subIndustry">
                  <SelectValue placeholder="Select a Subindustry" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndustryData?.subIndustries.map((sub, index) => (
                    <SelectItem value={sub} key={index}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("subIndustry")} />
              {errors.subIndustry && (
                <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
