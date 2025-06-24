"use client";
import DataList from "@/components/data-list/DataList";
import DialogForm from "@/components/dialog/Dialog";
import { useState, useEffect } from "react";
import { Data } from "@/type/data";

export default function Home() {
  const [dataList, setDataList] = useState<Data[] | undefined>();
  const [open, setOpen] = useState(false);
  const [missing, setMissing] = useState<number[]>([]);

  useEffect(() => {
    findMissingPriority(dataList);
  }, [dataList]);

  /**
   * Handles form submission, extracts data, and adds it to the list.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const priority = Number(formData.get("priority"));
    setDataList((prev: Data[] | undefined) => {
      const currentList = prev ?? [];
      const existingIds = currentList.map((item) => item.id);
      const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
      return [
        ...currentList,
        {
          id: maxId + 1,
          name,
          priority,
        } as Data,
      ];
    });
    setOpen(false);
  };

  /**
   * Finds all missing positive integers between the 1 and largest priority
   * values in the data list.
   */
  const findMissingPriority = (data?: Data[]) => {
    if (!data) {
      setMissing([]);
      return;
    }

    const priorities = data.map((d) => d.priority);
    const max = Math.max(...priorities);

    const seen = new Set(priorities);
    const missing: number[] = [];
    for (let i = 1; i < max; i++) {
      if (!seen.has(i)) missing.push(i);
    }

    setMissing(missing);
  };

  /**
   * Handles item deletions.
   */
  const handleDelete = (dataId: number) => {
    setDataList((prev) => prev?.filter((data) => data.id !== dataId));
  };

  return (
    <div className="mx-auto max-w-lg mt-10">
      <div className="text-right">
        <DialogForm
          open={open}
          setOpen={setOpen}
          handleSubmit={handleSubmit}
        ></DialogForm>
      </div>
      <DataList
        tableData={dataList}
        missingPriority={missing}
        handleDelete={handleDelete}
      />
    </div>
  );
}
