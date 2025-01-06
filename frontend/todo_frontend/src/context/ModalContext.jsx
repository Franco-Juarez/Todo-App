import { createContext, useState, useContext } from 'react';

// Crear el contexto para el modal
const ModalContext = createContext();

// Crear un hook personalizado para acceder al contexto
export const useModal = () => {
  return useContext(ModalContext);
};

// Proveedor del contexto
export const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null); // Datos para la tarea a editar

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => {
    setIsModalVisible(false);
    setModalData(null); // Limpiar datos del modal al cerrarlo
  };

  return (
    <ModalContext.Provider value={{ isModalVisible, modalData, setModalData, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
