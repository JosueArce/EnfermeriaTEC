using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webservicePrueba.Models
{
    /// <summary>
    /// Clase que sirve para poder insertar u obtener registros desde la BD
    /// </summary>
    public class Registros
    {
        public int ID { get; set; }
        public int edad { get; set; }
        public DateTime fecha { get; set; }
        public bool primera_vez { get; set; }
        public bool subsequente { get; set; }
        public bool estudiante { get; set; }
        public bool funcionario { get; set; }
        public bool familiar { get; set; }
        public bool pensionado {get; set; }
        public bool referencia { get; set; }
        public bool sexo { get; set; }
        public string hora { get; set; }
    }
}