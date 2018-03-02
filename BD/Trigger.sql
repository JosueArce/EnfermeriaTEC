CREATE TRIGGER trigger_set_date
ON dbo.clients_table
AFTER INSERT
AS
BEGIN
	UPDATE dbo.clients_table
	SET fecha_hora = GETDATE()
	FROM dbo.clients_table
	WHERE ID_Register = (SELECT MAX(ID_Register) FROM dbo.clients_table)
END

