"use client";

import React, { FormEvent, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Autocomplete,
  AutocompleteItem
} from "@nextui-org/react";
import { displayToast } from "@/src/lib/toast";
import { countries as listCountries } from "../../../../../data.json";

type CountryProps = {
  name: string;
  continent: string;
  language: string;
  currency: string;
};

export default function App() {
  const [formData, setFormData] = React.useState<any>(null);
  const [countries, setCountries] = useState<CountryProps[]>(listCountries);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget)) as any;

      const modifyLocalDishes = data.local_dishes
        .split(",")
        .map((item: string) => item.trim());
      const modifyAttractionPlaces = data.top_attractions
        .split(",")
        .map((item: string) => item.trim());

      const updateData = {
        id: crypto.randomUUID(),
        ...data,
        local_dishes: modifyLocalDishes,
        top_attractions: modifyAttractionPlaces
      };

      const response = await fetch("http://localhost:3000/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        setFormData("reset");
        displayToast("Todo created successfully", "success");
      } else {
        displayToast("Todo created failed", "error");
      }
    } catch (error: any) {
      displayToast("Todo created failed", "error");
    }
  };

  const handleReset = () => {
    setFormData("reset");
  };

  return (
    <section className="w-full max-w-5xl m-auto px-6">
      <div className="py-8">
        <h1 className="text-3xl font-semibold text-white">Create tour</h1>
      </div>
      <Form
        className="w-full flex flex-col gap-4"
        validationBehavior="native"
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="Name"
          name="name"
          placeholder="Enter your name"
          type="text"
          fullWidth
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <Autocomplete
            isRequired
            label="Select an country"
            fullWidth
            name="country"
          >
            {countries.map((country, index) => (
              <AutocompleteItem key={`country-${index}`}>
                {country.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Select
            isRequired
            label="Select an continent"
            fullWidth
            name="continent"
          >
            {countries.map((country, index) => (
              <SelectItem key={`continent-${index}`}>
                {country.continent}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Textarea
          name="description"
          label="Description"
          placeholder="Enter your description about place"
          fullWidth
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <Autocomplete label="Select an currency" fullWidth name="currency">
            {countries.map((country, index) => (
              <AutocompleteItem key={`currency-${index}`}>
                {country.currency}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Autocomplete
            isRequired
            label="Select an language"
            fullWidth
            name="language"
          >
            {countries.map((country, index) => (
              <AutocompleteItem key={`language-${index}`}>
                {country.language}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <div className="w-full grid grid-cols-2 gap-4">
          <Input
            isRequired
            fullWidth
            errorMessage="Please enter a valid population"
            label="Population"
            name="population"
            placeholder="Enter your population"
            type="text"
          />

          <Input
            isRequired
            fullWidth
            errorMessage="Please enter a valid best time to visit"
            label="Best time to visit"
            name="best_time_to_visit"
            placeholder="Enter best time to visit"
            type="text"
          />
        </div>
        <Input
          isRequired
          fullWidth
          errorMessage="Please enter a valid image link"
          label="Image"
          name="image"
          placeholder="Enter image link"
          type="text"
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <Textarea
            fullWidth
            name="top_attractions"
            label="Top attractions"
            placeholder="Enter name of attraction places"
            description="Type , for separate name of place. Ex: Angkor Wath, Pyramit, etc"
          />
          <Textarea
            fullWidth
            name="local_dishes"
            label="Local dishes"
            placeholder="Enter popular local dishes"
            description="Type , for separate name of dish. Ex: Pizza, Donut, etc"
          />
        </div>
        <div className="flex gap-2 pb-10">
          <Button color="primary" type="submit">
            Create
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </section>
  );
}
