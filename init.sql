CREATE TABLE IF NOT EXISTS users (
    id bigint generated always as IDENTITY ,
    name varchar(20),
    email varchar(30)
);

CREATE OR REPLACE FUNCTION notify_change() RETURNS trigger AS $$
BEGIN
  PERFORM pg_notify('db_changes', json_build_object(
    'operation', TG_OP,
    'table', TG_TABLE_NAME,
    'data', row_to_json(NEW)
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_change_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION notify_change();
