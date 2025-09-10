"use client";

import React from "react";
import { getLocalizedValues } from "@/hooks/general";
import GroundCard from "@/components/common/GroundCard";

const Grounds = ({ fields }: { fields: any }) => {
    return (
        <>
            {fields.map((field: any) => {
                field = getLocalizedValues(field);
                return (
                    <div key={field._id}>
                        <GroundCard field={field} />
                    </div>
                );
            })}
        </>
    );
};

export default Grounds;
