using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Mvc;
using System.Data;

namespace webservicePrueba.Models
{
    public class RegistrosManager
    {
        //permite conectar a la base de datos
        private static string cadenaConexion =
            @"Server=192.168.56.1\SQLEXPRESS;Database=EnfermeriaTEC;User Id=sa;Password=12345";
        SqlConnection connection = new SqlConnection(cadenaConexion);//permite establecer la conexion con la Base de Datos
        string sqlQuery;//almacena la consulta SQL, se utiliza en la mayoria de los metodos
        SqlCommand command;//permite realizar la consulta mediante la cadena conexion y la consulta

       /// <summary>
       /// Permite extraer todos los registros que se encuentren en un rango de dias
       /// </summary>
       /// <param name="fechaInicial"></param>
       /// <param name="fechaFinal"></param>
       /// <returns></returns>
        public List<Registros> Extraer_Registros(DateTime fechaInicial, DateTime fechaFinal)
        {
            Registros registro;
            List<Registros> lista = new List<Registros>();
            try
            {
                connection.Open();
                sqlQuery = "SELECT edad,primera_vez,subsecuente,estudiante,funcionario,familiar,pensionado,referencia,sexo,fecha_hora,ID_Register,hora FROM dbo.clients_table WHERE fecha_hora BETWEEN '" + fechaInicial + "'AND'" + fechaFinal + "' order by ID_Register ASC";
                command = new SqlCommand(sqlQuery, connection);
                SqlDataReader reader = command.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                while (reader.Read())
                {
                    registro = new Registros
                    {
                        edad = reader.GetInt32(0),
                        primera_vez = reader.GetBoolean(1),
                        subsequente = reader.GetBoolean(2),
                        estudiante = reader.GetBoolean(3),
                        funcionario = reader.GetBoolean(4),
                        familiar = reader.GetBoolean(5),
                        pensionado = reader.GetBoolean(6),
                        referencia = reader.GetBoolean(7),
                        sexo = reader.GetBoolean(8),
                        fecha = reader.GetDateTime(9),
                        ID = reader.GetInt32(10),
                        hora = reader.GetString(11)
                    };

                    lista.Add(registro);
                }

                connection.Close();
                return lista;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite insertar un nuevo registro
        /// </summary>
        /// <param name="registro"></param>
        /// <returns></returns>
        public Boolean Insertar_Registro(Registros registro)
        {
            try
            {
                connection.Open();
                sqlQuery = "INSERT INTO clients_table (edad,primera_vez,subsecuente,estudiante,funcionario,familiar,pensionado,referencia,sexo,hora) VALUES (@edad,@first,@sub,@est,@func,@fam,@pen,@ref,@sexo,@hora)";
                command = new SqlCommand(sqlQuery, connection); 
                command.Parameters.Add("@edad", System.Data.SqlDbType.Int).Value = registro.edad;
                command.Parameters.Add("@first", System.Data.SqlDbType.Bit).Value = registro.primera_vez;
                command.Parameters.Add("@sub", System.Data.SqlDbType.Bit).Value = registro.subsequente;
                command.Parameters.Add("@est", System.Data.SqlDbType.Bit).Value = registro.estudiante;
                command.Parameters.Add("@func", System.Data.SqlDbType.Bit).Value = registro.funcionario;
                command.Parameters.Add("@fam", System.Data.SqlDbType.Bit).Value = registro.familiar;
                command.Parameters.Add("@pen", System.Data.SqlDbType.Bit).Value = registro.pensionado;
                command.Parameters.Add("@ref", System.Data.SqlDbType.Bit).Value = registro.referencia;
                command.Parameters.Add("@sexo", System.Data.SqlDbType.Bit).Value = registro.sexo;
                command.Parameters.Add("@hora", System.Data.SqlDbType.VarChar).Value = registro.hora;
                int resp = command.ExecuteNonQuery();

                connection.Close();
                if (resp == -1) return false;
                else return true;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite modificar los campos de una fila en la tabla clients_table
        /// </summary>
        /// <param name="registro">Nuevo set de datos</param>
        /// <returns></returns>
        public Boolean Actualizar_Registro(Registros registro)
        {
            try
            {
                connection.Open();
                sqlQuery = "UPDATE clients_table SET edad = @edad, primera_vez = @first, subsecuente = @sub, estudiante = @est, funcionario = @func, familiar = @fam,pensionado=@pen,referencia=@ref,sexo=@sexo,hora=@hora WHERE ID_Register = @ID";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@edad", registro.edad);
                command.Parameters.AddWithValue("@first", registro.primera_vez);
                command.Parameters.AddWithValue("@sub", registro.subsequente);
                command.Parameters.AddWithValue("@est", registro.estudiante);
                command.Parameters.AddWithValue("@func", registro.funcionario);
                command.Parameters.AddWithValue("@fam", registro.familiar);
                command.Parameters.AddWithValue("@pen", registro.pensionado);
                command.Parameters.AddWithValue("@ref", registro.referencia);
                command.Parameters.AddWithValue("@sexo", registro.sexo);
                command.Parameters.AddWithValue("@hora",registro.hora);
                command.Parameters.AddWithValue("@ID", registro.ID);

                int resp = command.ExecuteNonQuery();

                connection.Close();
                if (resp == -1) return false;
                else return true;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite eliminar un registro de la tabla clients_table
        /// </summary>
        /// <param name="ID_Registro"></param>
        /// <returns></returns>
        public Boolean Borrar_Registro(int ID_Registro)
        {
            try
            {
                connection.Open();
                sqlQuery = "DELETE FROM clients_table WHERE ID_Register = @ID";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@ID", ID_Registro);

                int resp = command.ExecuteNonQuery();

                connection.Close();
                if (resp == -1) return false;
                else return true;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite obtener la estadistica de asistencia a enfermeria
        /// </summary>
        /// <returns></returns>
        public List<int> Extraer_Frecuencia(DateTime fechaInicial, DateTime fechaFinal)
        {
            List<int> lista = new List<int>();
            try
            {
                connection.Open();
                sqlQuery = "SELECT COUNT(primera_vez) from clients_table where primera_vez = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                int result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where subsecuente = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);

                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                connection.Close();
                return lista;

            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite obtener estadisticas del genero
        /// </summary>
        /// <returns></returns>
        public List<int> Extraer_Genero(DateTime fechaInicial, DateTime fechaFinal)
        {
            List<int> lista = new List<int>();
            try
            {
                connection.Open();
                sqlQuery = "SELECT COUNT(primera_vez) from clients_table where sexo = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial",System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal",System.Data.SqlDbType.DateTime).Value = fechaFinal;
                int result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where sexo = 0 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                connection.Close();
                return lista;

            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite extraer estadisticas de los que han asistido
        /// </summary>
        /// <returns></returns>
        public List<int> Extraer_Citas(DateTime fechaInicial, DateTime fechaFinal)
        {
            List<int> lista = new List<int>();
            try
            {
                connection.Open();
                sqlQuery = "SELECT COUNT(primera_vez) from clients_table where estudiante = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                int result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where funcionario = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where familiar = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where pensionado = 1";
                command = new SqlCommand(sqlQuery, connection);
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                connection.Close();
                return lista;

            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite obtener los registros por semestre solicitados por la CCSS
        /// </summary>
        /// <param name="fechaInicial"></param>
        /// <param name="fechaFinal"></param>
        /// <returns></returns>
        public List<int> Extraer_CCSS(DateTime fechaInicial, DateTime fechaFinal)
        {
            List<int> lista = new List<int>();
            try
            {
                connection.Open();
                sqlQuery = "SELECT COUNT(primera_vez) from clients_table where primera_vez = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial",System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                int result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                sqlQuery = "SELECT COUNT(subsecuente) from clients_table where subsecuente = 1 and fecha_hora between @fechaInicial and @fechaFinal";
                command = new SqlCommand(sqlQuery, connection);

                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                result = Convert.ToInt32(command.ExecuteScalar());
                lista.Add(result);

                connection.Close();
                return lista;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }

        /// <summary>
        /// Permite obtener los registros mensuales solicitados por el TEC
        /// </summary>
        /// <param name="fechaInicial"></param>
        /// <param name="fechaFinal"></param>
        /// <returns></returns>
        public List<List<int>> Extraer_TEC(DateTime fechaInicial, DateTime fechaFinal)
        {
            List<int> listaTemp = new List<int>();
            List<List<int>> lista = new List<List<int>>();

            try
            {
                connection.Open();
                sqlQuery = "SELECT edad from clients_table where fecha_hora between @fechaInicial and @fechaFinal and primera_vez = 1";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                SqlDataReader reader = command.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                while (reader.Read())
                {
                        listaTemp.Add(reader.GetInt32(0));
                }

                lista.Add(listaTemp);
                connection.Close();

                listaTemp = new List<int>();

                connection.Open();
                sqlQuery = "SELECT edad from clients_table where fecha_hora between @fechaInicial and @fechaFinal and subsecuente = 1";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.Add("@fechaInicial", System.Data.SqlDbType.DateTime).Value = fechaInicial;
                command.Parameters.Add("@fechaFinal", System.Data.SqlDbType.DateTime).Value = fechaFinal;
                reader = command.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
                while (reader.Read())
                {
                    listaTemp.Add(reader.GetInt32(0));
                }

                lista.Add(listaTemp);

                connection.Close();
                return lista;
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
        }
    }
    
}