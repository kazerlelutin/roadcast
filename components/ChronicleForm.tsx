/* eslint-disable react-hooks/exhaustive-deps */
import { useChronicle } from "@/entities";
import { useDebounce } from "@/hooks";
import { Input } from "@/ui";
import { Chronicle } from "@prisma/client";
import { useEffect, useState } from "react";


export function ChronicleForm() {
  const {chronicle,setChronicle, updateChronicleField} = useChronicle()
  const [lastChronicleUpdate, setLastChronicleUpdate] = useState<Date>(chronicle.updatedAt)
  const chronicleDebounced = useDebounce<Date>(lastChronicleUpdate, 1000)


  function handleUpdateField(field: string, value: string) {
    setChronicle({[field]: value})
    setLastChronicleUpdate(new Date())
  }
  useEffect(() => {
    
    if(chronicleDebounced === chronicle.updatedAt) return
    console.log('chronicleDebounced', chronicleDebounced, lastChronicleUpdate)
 updateChronicleField(chronicle)
 
  }
  , [chronicleDebounced])



  return <div className="flex flex-col gap-2 rounded border border-rc-bg-dark p-2">

    <Input value={chronicle.title} onChange={(title)=> handleUpdateField('title',title)}/>
  </div>
}
