-- Создание таблицы клиентов
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'vip')),
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0.00,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_order_date TIMESTAMP,
    notes TEXT
);

-- Создание таблицы инструментов
CREATE TABLE IF NOT EXISTS tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'rented', 'maintenance')),
    description TEXT,
    image_emoji VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    tool_id INTEGER REFERENCES tools(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('active', 'completed', 'upcoming', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Создание таблицы платежей
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id),
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('paid', 'pending', 'overdue', 'refunded')),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(100),
    notes TEXT
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Вставка тестовых клиентов
INSERT INTO clients (full_name, email, phone, company, status, total_orders, total_spent, last_order_date) VALUES
('Иванов Иван Иванович', 'ivanov@example.com', '+7 (915) 123-45-67', 'СтройМастер ООО', 'vip', 15, 45000.00, '2026-01-15'),
('Петрова Анна Сергеевна', 'petrova@example.com', '+7 (916) 234-56-78', 'РемонтПро', 'active', 8, 18000.00, '2026-01-12'),
('Сидоров Петр Алексеевич', 'sidorov@example.com', '+7 (917) 345-67-89', NULL, 'active', 3, 5500.00, '2025-12-20'),
('Козлова Мария Дмитриевна', 'kozlova@example.com', '+7 (918) 456-78-90', 'Декор Плюс', 'vip', 22, 67000.00, '2026-01-16'),
('Смирнов Алексей Викторович', 'smirnov@example.com', '+7 (919) 567-89-01', NULL, 'active', 1, 1200.00, '2025-11-05'),
('Новикова Елена Павловна', 'novikova@example.com', '+7 (920) 678-90-12', 'ДомСтрой', 'active', 12, 32000.00, '2026-01-10'),
('Морозов Дмитрий Игоревич', 'morozov@example.com', '+7 (921) 789-01-23', NULL, 'blocked', 5, 8000.00, '2025-10-15'),
('Волкова Ольга Николаевна', 'volkova@example.com', '+7 (922) 890-12-34', 'ЭлитРемонт', 'vip', 18, 52000.00, '2026-01-14');

-- Вставка инструментов
INSERT INTO tools (name, category, price_per_day, status, image_emoji, description) VALUES
('Перфоратор Bosch GBH 2-28', 'Электроинструмент', 500.00, 'available', '🔨', 'Мощный перфоратор для сверления бетона'),
('Болгарка Makita GA9020', 'Электроинструмент', 400.00, 'available', '⚙️', 'Угловая шлифмашина 230мм'),
('Бетономешалка 180л', 'Строительное', 800.00, 'rented', '🏗️', 'Бетономешалка объемом 180 литров'),
('Генератор 5кВт', 'Энергооборудование', 1200.00, 'available', '⚡', 'Бензиновый генератор мощностью 5кВт'),
('Лестница 6м', 'Оснастка', 300.00, 'available', '🪜', 'Алюминиевая раздвижная лестница'),
('Шуруповёрт DeWalt', 'Электроинструмент', 350.00, 'available', '🔧', 'Аккумуляторный шуруповёрт 18В'),
('Компрессор 50л', 'Энергооборудование', 600.00, 'maintenance', '💨', 'Воздушный компрессор 50 литров'),
('Рубанок электрический', 'Электроинструмент', 450.00, 'available', '🪚', 'Электрорубанок для обработки дерева');

-- Вставка тестовых бронирований
INSERT INTO bookings (client_id, tool_id, start_date, end_date, total_price, status) VALUES
(1, 1, '2026-01-10', '2026-01-17', 3500.00, 'active'),
(2, 2, '2026-01-20', '2026-01-25', 2000.00, 'upcoming'),
(4, 4, '2025-12-15', '2025-12-22', 8400.00, 'completed'),
(6, 5, '2026-01-15', '2026-01-18', 900.00, 'active'),
(1, 6, '2026-01-22', '2026-01-28', 2100.00, 'upcoming');

-- Вставка платежей
INSERT INTO payments (booking_id, amount, status, payment_method) VALUES
(1, 3500.00, 'paid', 'Банковская карта'),
(2, 2000.00, 'pending', 'Наличные'),
(3, 8400.00, 'paid', 'Банковский перевод'),
(4, 900.00, 'paid', 'Банковская карта'),
(5, 2100.00, 'pending', 'Банковская карта');