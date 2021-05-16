CREATE DATABASE db_motociclistas
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;
    
CREATE TABLE public.users(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.hours(
    id_hour SERIAL PRIMARY KEY,
    hour VARCHAR(10) NOT NULL
);

CREATE TABLE public.turns(
	id_turn SERIAL PRIMARY KEY,
	id_hour SERIAL REFERENCES public.hours(id_hour),
    id_user SERIAL REFERENCES public.users(id_user)
);

-- these are the timetables available

INSERT INTO hours(hour) VALUES  ('08:00 AM'),
                                ('08:30 AM'),
                                ('09:00 AM'),
                                ('09:30 AM'),
                                ('10:00 AM'),
                                ('10:30 AM'),
                                ('11:00 AM'),
                                ('11:30 AM'),
                                ('12:00 PM'),
                                ('12:30 PM'),
                                ('01:00 PM'),
                                ('01:30 PM'),
                                ('02:00 PM'),
                                ('02:30 PM'),
                                ('03:00 PM'),
                                ('03:30 PM'),
                                ('04:00 PM'),
                                ('04:30 PM'),
                                ('05:00 PM'),
                                ('05:30 PM'),
                                ('06:00 PM'),
                                ('06:30 PM'),
                                ('07:00 PM'),
                                ('07:30 PM'),
                                ('08:00 PM');
                                     