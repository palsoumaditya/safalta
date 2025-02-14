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
import { Input } from "@/components/ui/input";
import { onboardingSchema } from "../../../lib/schema";
import { industries } from "@/data/industries"; 
import { Textarea } from "@/components/ui/textarea";

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

  const onSubmit = async (values) =>{
    console.log(values);
  }

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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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

            {/* SubIndustry Select (conditionally rendered) */}
            {industryValue && (
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
            )}

            {/* Years of Experience Input */}
            <div className="space-y-2 mt-4">
              <label htmlFor="experience">Years of Experience</label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter your years of experience"
                {...register("experience", { valueAsNumber: true })}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
            <div className="space-y-2 mt-4">
              <label htmlFor="skills">Skills</label>
              <Input
                id="skills"
                placeholder="e.g Python, Project Management, etc."
                {...register("skills", { valueAsNumber: true })}
              />
              <p className="text-sm text-muted-foreground">Separate skills with commas</p>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
            <div className="space-y-2 mt-4">
              <label htmlFor="bio">Professional Bio</label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional journey and achievements"
                className="h-32"
                {...register("bio", { valueAsNumber: true })}
                />
              {errors.bio && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>
            {/* Submit Button */}
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Complete Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
