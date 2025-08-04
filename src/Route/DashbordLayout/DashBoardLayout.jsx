import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import UserContext from '../../ContextApi/UserContext/UserContext';

const DashBoardLayout = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === 'admin';

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden absolute top-4 right-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="bg-white p-2 rounded shadow">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar for small devices (with animation) */}
      <motion.aside
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={sidebarVariants}
        transition={{ type: 'tween', duration: 0.4 }}
        className="w-64 bg-white text-black shadow p-4 fixed h-full z-40 lg:hidden"
      >
        <SidebarContent user={user} isAdmin={isAdmin} onClose={() => setIsOpen(false)} />
      </motion.aside>

      {/* Sidebar for large screens (always visible) */}
      <aside className="hidden lg:block w-64 bg-white text-black shadow p-4 h-full fixed">
        <SidebarContent user={user} isAdmin={isAdmin} />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen p-6 w-full lg:ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;

// SidebarContent extracted for reuse
const SidebarContent = ({ user, isAdmin, onClose }) => {
  return (
    <>
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.photoURL || 'https://i.ibb.co/4W2DGKm/default-user.png'}
          alt="User"
          className="w-20 h-20 rounded-full border-4 border-gray-300 mb-2"
        />
        <p className="text-lg font-semibold">{user?.displayName || 'User Name'}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              onClick={onClose}
              className="block py-2 px-4 hover:bg-gray-200 rounded"
            >
              Dashboard Home
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-cars"
              onClick={onClose}
              className="block py-2 px-4 hover:bg-gray-200 rounded"
            >
              My Cars
            </Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/dashboard/manage-users"
                  onClick={onClose}
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/add-car"
                  onClick={onClose}
                  className="block py-2 px-4 hover:bg-gray-200 rounded"
                >
                  Add Car
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/"
              onClick={onClose}
              className="block py-2 px-4 hover:bg-gray-200 rounded"
            >
              Back to Home
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
