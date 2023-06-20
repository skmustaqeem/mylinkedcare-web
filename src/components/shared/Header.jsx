import { Fragment, useState } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Sidebar from '../Sidebar'



const user = {
    name: 'Chelsea Hagon',
    email: 'chelsea.hagon@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Dashboard', href: '#', current: true },

]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



export default function Example() {
    const [open, setOpen] = useState(true)


    return (
        <>
            <header id="header" className='w-full fixed shadow-sm bg-white'>
                <div className='container-lg'>
                    <nav className="flex items-center justify-between" >
                        <div className="">
                            <div className="cursor-pointer">
                                <a href="home"><img src="images/bitpass-logo-sm.svg" className='mobile' /></a>
                                <a href="home"><img src="images/bitpass-logo-desktop.svg" className='desktop logo' /></a>
                            </div>
                        </div>
                       

                        <div className='desktop'>
                        <i class="ri-notification-3-line nav-icon mr-10 notification"><span></span></i>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        <i className="ri-user-line nav-icon green" ></i>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (

                                                    <a
                                                        href="/"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >Login
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (

                                                    <a
                                                        href="home"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >Home
                                                    </a>
                                                )}
                                            </Menu.Item>
                                           
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="dashboard"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >Dashboard
                                                    </a>
                                                )}
                                            </Menu.Item>
                                           
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="almostDone"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >Almost there
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="setPassword"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >SetPassword
                                                    </a>
                                                )}
                                            </Menu.Item>


                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href=""
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >Sign Out
                                                    </a>
                                                )}
                                            </Menu.Item>

                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div> 
                        <div className='mobile'><i class="ri-notification-3-line nav-icon mr-10 notification"><span></span></i> <Sidebar /></div>
                    </nav>
                </div>
            </header >

            <Transition.Root show={open} as={Fragment} className="hide">
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0" />

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                            <div className="px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium text-gray-900">Panel title</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                {/* Replace with your content */}
                                                <div className="absolute inset-0 px-4 sm:px-6">
                                                    <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                                                </div>
                                                {/* /End replace */}
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>


    )
}


function SideBar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {!isOpen ?
                (
                    <button onClick={() => setIsOpen(!isOpen)}><img src="images/burger-menu.svg" className='cursor-pointer ' /></button>

                ) : (
                    <div className='fixed right-0 top-0 p-5 bg-blue-100 w-80 h-full z-10'>
                        <div className='flex justify-between'>
                            <h2>Menu</h2>
                            <img src="images/icon-close-circle.svg" />
                        </div>
                    </div>
                )
            }

        </>
    )

}