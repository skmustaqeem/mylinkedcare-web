import React from "react"

export default function PageTitle(props) {

  return (
    <div className='page-title'>
      <h1 className=''>{props.title}</h1>
      {props?.subTitle && <p>{props.subTitle}</p>}
    </div>
  )
}


