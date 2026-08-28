import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "./Modal";

const AddTask = ({ onAdd }) => {
  const [titulo, setTitulo] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [importante, setImportante] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const formatDateToBR = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setShowModal(true);
      return;
    }

    const diaFormatado = selectedDate 
      ? formatDateToBR(selectedDate)
      : new Date().toLocaleDateString('pt-BR');

    onAdd({ 
      titulo: titulo.trim(), 
      dia_atividade: diaFormatado, 
      importante 
    });

    setTitulo("");
    setSelectedDate(null);
    setImportante(true);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Tarefa</label>
        <input
          type="text"
          placeholder="O que você precisa fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      
      <div className="form-control">
        <label>Data/Prazo</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecione uma data"
          className="date-picker-input"
          isClearable
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
        />
      </div>
      
      <div className="form-control-check">
        <input
          type="checkbox"
          id="importante"
          checked={importante}
          onChange={(e) => setImportante(e.target.checked)}
        />
        <label htmlFor="importante">Importante</label>
      </div>
      
      <button type="submit" className="btn btn-block success">
        Adicionar Nova Tarefa
      </button>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Campo obrigatório"
        message="Por favor, adicione uma descrição para a tarefa"
        type="warning"
      />
    </form>
  );
};

export default AddTask;
