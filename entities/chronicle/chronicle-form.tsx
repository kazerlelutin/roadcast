import { ChronicleContext } from './chronicle'
import { useContext, useState } from 'react'
import { Col } from '../../ui/col/col'
import { ChronicleFormDescription } from './chronicle-form-description'

export const ChronicleForm: React.FC = () => {
  const [chronicle] = useContext(ChronicleContext)

  return (
    <Col>
      <p>{chronicle.title}</p>
      <p>{chronicle.editor} editor</p>
      <p>Time</p>
      <ChronicleFormDescription />
    </Col>
  )
}
