import { useState, useEffect } from "react";

const useFormData = (modalData = null) => {
  const [formData, setFormData] = useState({
    project: "",
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    tags: [],
  });

  useEffect(() => {
    if (modalData) {
      setFormData(modalData); // Si hay modalData, pre-poblamos el formulario
    } else {
      setFormData({
        project: "",
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        tags: [],
      });
    }
  }, [modalData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (event) => {
    const tags = event.target.value;
    // Convertimos el string separado por comas en un array de strings
    const tagsArray = tags.split(",").map(tag => tag.trim());
    
    // Actualizamos el estado con el array de tags
    handleChange({
      target: {
        name: "tags",
        value: tagsArray,
      }
    });
  };

  return { formData, handleChange, handleTagsChange };
};

export default useFormData;
