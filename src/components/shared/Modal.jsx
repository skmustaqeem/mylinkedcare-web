// import React from "react";

// const Modal = ({ children }) => {
//   return (
//     <div
//       className="modal fade bitpass-modal"
//       id="tag-view-modal4"
//       data-bs-backdrop="static"
//       data-bs-keyboard="false"
//       tabIndex="-2"
//       aria-labelledby="staticBackdropLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { Dialog } from '@headlessui/react';

export default function Modal({ open, setOpen, children }) {

  return (
    <Dialog as="div" open={open} className="relative z-10" onClose={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {children}
    </Dialog>
  )
}