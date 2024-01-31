"use client"

import React, { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { FilterValues, PeriodValues } from "@/types/filter"
import { capitalizeFirstLetter } from "@/utils/capitalize"
import { FilterItem } from "./filter-item"

const Filter: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const currentFilterValue = searchParams.get("filter")
  const periodKey = searchParams.get("period")

  const [filterValue, setFilterValue] = useState<FilterValues>(
    (currentFilterValue as FilterValues) || FilterValues.LASTED
  )

  const onChangeFilter = (value: string) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("filter", value)
    urlSearchParam.delete("period")

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  const onChangePeriod = (value: string) => {
    const urlSearchParam = new URLSearchParams(searchParams)
    urlSearchParam.set("period", value)
    urlSearchParam.set("filter", FilterValues.HOT)

    router.push(`${pathname}?${urlSearchParam.toString()}`)
  }

  return (
    <div className="flex h-10 items-center justify-between">
      <div className="flex gap-2">
        <FilterItem
          label="New"
          isActive={filterValue === "lasted"}
          onclick={() => {
            setFilterValue(FilterValues.LASTED)
            onChangeFilter("lasted")
          }}
        />
        <FilterItem
          label="Hot"
          isActive={filterValue === FilterValues.HOT}
          onclick={() => {
            setFilterValue(FilterValues.HOT)
          }}
        />
      </div>
      {filterValue === FilterValues.HOT && (
        <div className="flex gap-1">
          {Object.values(PeriodValues).map((period) => (
            <FilterItem
              key={period}
              label={capitalizeFirstLetter(period)}
              isActive={periodKey === period}
              onclick={() => onChangePeriod(period)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Filter
