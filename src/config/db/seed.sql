-- Insert asset types for Valorant
INSERT INTO asset_types (id, code, name) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'VP', 'Valorant Points'),
  ('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'RAD', 'Radianite'),
  ('c3d4e5f6-a7b8-9012-cdef-345678901234', 'KC', 'Kingdom Credits');

-- Insert 5 Indian users
INSERT INTO users (id, name, email) VALUES
  ('d4e5f6a7-b8c9-0123-def0-456789012345', 'Rahul Sharma', 'rahul.sharma@example.com'),
  ('e5f6a7b8-c9d0-1234-ef01-567890123456', 'Priya Patel', 'priya.patel@example.com'),
  ('f6a7b8c9-d0e1-2345-f012-678901234567', 'Amit Kumar', 'amit.kumar@example.com'),
  ('a7b8c9d0-e1f2-3456-0123-789012345678', 'Sneha Gupta', 'sneha.gupta@example.com'),
  ('b8c9d0e1-f2a3-4567-1234-890123456789', 'Vikram Singh', 'vikram.singh@example.com');

-- Insert wallets: user wallets for each asset, plus system wallets
INSERT INTO wallets (id, owner_type, owner_id, asset_type_id) VALUES
  -- Rahul's wallets
  ('c9d0e1f2-a3b4-5678-2345-901234567890', 'USER', 'd4e5f6a7-b8c9-0123-def0-456789012345', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('d0e1f2a3-b4c5-6789-3456-012345678901', 'USER', 'd4e5f6a7-b8c9-0123-def0-456789012345', 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('e1f2a3b4-c5d6-7890-4567-123456789012', 'USER', 'd4e5f6a7-b8c9-0123-def0-456789012345', 'c3d4e5f6-a7b8-9012-cdef-345678901234'), -- KC
  -- Priya's wallets
  ('f2a3b4c5-d6e7-8901-5678-234567890123', 'USER', 'e5f6a7b8-c9d0-1234-ef01-567890123456', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('a3b4c5d6-e7f8-9012-6789-345678901234', 'USER', 'e5f6a7b8-c9d0-1234-ef01-567890123456', 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('b4c5d6e7-f8a9-0123-7890-456789012345', 'USER', 'e5f6a7b8-c9d0-1234-ef01-567890123456', 'c3d4e5f6-a7b8-9012-cdef-345678901234'), -- KC
  -- Amit's wallets
  ('c5d6e7f8-a9b0-1234-8901-567890123456', 'USER', 'f6a7b8c9-d0e1-2345-f012-678901234567', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('d6e7f8a9-b0c1-2345-9012-678901234567', 'USER', 'f6a7b8c9-d0e1-2345-f012-678901234567', 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('e7f8a9b0-c1d2-3456-0123-789012345678', 'USER', 'f6a7b8c9-d0e1-2345-f012-678901234567', 'c3d4e5f6-a7b8-9012-cdef-345678901234'), -- KC
  -- Sneha's wallets
  ('f8a9b0c1-d2e3-4567-1234-890123456789', 'USER', 'a7b8c9d0-e1f2-3456-0123-789012345678', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('a9b0c1d2-e3f4-5678-2345-901234567890', 'USER', 'a7b8c9d0-e1f2-3456-0123-789012345678', 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('b0c1d2e3-f4a5-6789-3456-012345678901', 'USER', 'a7b8c9d0-e1f2-3456-0123-789012345678', 'c3d4e5f6-a7b8-9012-cdef-345678901234'), -- KC
  -- Vikram's wallets
  ('c1d2e3f4-a5b6-7890-4567-123456789012', 'USER', 'b8c9d0e1-f2a3-4567-1234-890123456789', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('d2e3f4a5-b6c7-8901-5678-234567890123', 'USER', 'b8c9d0e1-f2a3-4567-1234-890123456789', 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('e3f4a5b6-c7d8-9012-6789-345678901234', 'USER', 'b8c9d0e1-f2a3-4567-1234-890123456789', 'c3d4e5f6-a7b8-9012-cdef-345678901234'), -- KC
  -- System wallets
  ('f4a5b6c7-d8e9-0123-7890-456789012345', 'SYSTEM', NULL, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'), -- VP
  ('a5b6c7d8-e9f0-1234-8901-567890123456', 'SYSTEM', NULL, 'b2c3d4e5-f6a7-8901-bcde-f23456789012'), -- RAD
  ('b6c7d8e9-f0a1-2345-9012-678901234567', 'SYSTEM', NULL, 'c3d4e5f6-a7b8-9012-cdef-345678901234'); -- KC

-- Insert initial transactions and ledger entries for random balances
-- Note: Using fixed "random" values for simplicity; in real scenarios, use application logic

-- Rahul's initial balances
INSERT INTO transactions (id, type, idempotency_key, status, description) VALUES
  ('a5b6c7d8-e9f0-1234-8901-567890123456', 'INITIAL', 'init-rahul', 'COMPLETED', 'Initial seed balance');

INSERT INTO ledger_entries (id, transaction_id, wallet_id, amount, balance_after) VALUES
  ('b6c7d8e9-f0a1-2345-9012-678901234567', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'c9d0e1f2-a3b4-5678-2345-901234567890', 1500, 1500), -- Rahul VP
  ('c7d8e9f0-a1b2-3456-0123-789012345678', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'd0e1f2a3-b4c5-6789-3456-012345678901', 200, 200), -- Rahul RAD
  ('d8e9f0a1-b2c3-4567-1234-890123456789', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'e1f2a3b4-c5d6-7890-4567-123456789012', 300, 300), -- Rahul KC
  ('e9f0a1b2-c3d4-5678-2345-901234567890', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'f4a5b6c7-d8e9-0123-7890-456789012345', -1500, -1500), -- System VP
  ('f0a1b2c3-d4e5-6789-3456-012345678901', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'a5b6c7d8-e9f0-1234-8901-567890123456', -200, -200), -- System RAD
  ('a1b2c3d4-e5f6-7890-4567-123456789012', 'a5b6c7d8-e9f0-1234-8901-567890123456', 'b6c7d8e9-f0a1-2345-9012-678901234567', -300, -300); -- System KC

-- Priya's initial balances
INSERT INTO transactions (id, type, idempotency_key, status, description) VALUES
  ('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'INITIAL', 'init-priya', 'COMPLETED', 'Initial seed balance');

INSERT INTO ledger_entries (id, transaction_id, wallet_id, amount, balance_after) VALUES
  ('c3d4e5f6-a7b8-9012-cdef-345678901234', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'f2a3b4c5-d6e7-8901-5678-234567890123', 1200, 1200), -- Priya VP
  ('d4e5f6a7-b8c9-0123-def0-456789012345', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'a3b4c5d6-e7f8-9012-6789-345678901234', 150, 150), -- Priya RAD
  ('e5f6a7b8-c9d0-1234-ef01-567890123456', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'b4c5d6e7-f8a9-0123-7890-456789012345', 250, 250), -- Priya KC
  ('f6a7b8c9-d0e1-2345-f012-678901234567', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'f4a5b6c7-d8e9-0123-7890-456789012345', -1200, -2700), -- System VP
  ('a7b8c9d0-e1f2-3456-0123-789012345678', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'a5b6c7d8-e9f0-1234-8901-567890123456', -150, -350), -- System RAD
  ('b8c9d0e1-f2a3-4567-1234-890123456789', 'b2c3d4e5-f6a7-8901-bcde-f23456789012', 'b6c7d8e9-f0a1-2345-9012-678901234567', -250, -550); -- System KC

-- Amit's initial balances
INSERT INTO transactions (id, type, idempotency_key, status, description) VALUES
  ('c9d0e1f2-a3b4-5678-2345-901234567890', 'INITIAL', 'init-amit', 'COMPLETED', 'Initial seed balance');

INSERT INTO ledger_entries (id, transaction_id, wallet_id, amount, balance_after) VALUES
  ('d0e1f2a3-b4c5-6789-3456-012345678901', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'c5d6e7f8-a9b0-1234-8901-567890123456', 1800, 1800), -- Amit VP
  ('e1f2a3b4-c5d6-7890-4567-123456789012', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'd6e7f8a9-b0c1-2345-9012-678901234567', 300, 300), -- Amit RAD
  ('f2a3b4c5-d6e7-8901-5678-234567890123', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'e7f8a9b0-c1d2-3456-0123-789012345678', 400, 400), -- Amit KC
  ('a3b4c5d6-e7f8-9012-6789-345678901234', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'f4a5b6c7-d8e9-0123-7890-456789012345', -1800, -4500), -- System VP
  ('b4c5d6e7-f8a9-0123-7890-456789012345', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'a5b6c7d8-e9f0-1234-8901-567890123456', -300, -650), -- System RAD
  ('c5d6e7f8-a9b0-1234-8901-567890123456', 'c9d0e1f2-a3b4-5678-2345-901234567890', 'b6c7d8e9-f0a1-2345-9012-678901234567', -400, -950); -- System KC

-- Sneha's initial balances
INSERT INTO transactions (id, type, idempotency_key, status, description) VALUES
  ('d6e7f8a9-b0c1-2345-9012-678901234567', 'INITIAL', 'init-sneha', 'COMPLETED', 'Initial seed balance');

INSERT INTO ledger_entries (id, transaction_id, wallet_id, amount, balance_after) VALUES
  ('e7f8a9b0-c1d2-3456-0123-789012345678', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'f8a9b0c1-d2e3-4567-1234-890123456789', 1000, 1000), -- Sneha VP
  ('f8a9b0c1-d2e3-4567-1234-890123456789', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'a9b0c1d2-e3f4-5678-2345-901234567890', 100, 100), -- Sneha RAD
  ('a9b0c1d2-e3f4-5678-2345-901234567890', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'b0c1d2e3-f4a5-6789-3456-012345678901', 200, 200), -- Sneha KC
  ('b0c1d2e3-f4a5-6789-3456-012345678901', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'f4a5b6c7-d8e9-0123-7890-456789012345', -1000, -5500), -- System VP
  ('c1d2e3f4-a5b6-7890-4567-123456789012', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'a5b6c7d8-e9f0-1234-8901-567890123456', -100, -750), -- System RAD
  ('d2e3f4a5-b6c7-8901-5678-234567890123', 'd6e7f8a9-b0c1-2345-9012-678901234567', 'b6c7d8e9-f0a1-2345-9012-678901234567', -200, -1150); -- System KC

-- Vikram's initial balances
INSERT INTO transactions (id, type, idempotency_key, status, description) VALUES
  ('e3f4a5b6-d8e9-0123-7890-456789012345', 'INITIAL', 'init-vikram', 'COMPLETED', 'Initial seed balance');

INSERT INTO ledger_entries (id, transaction_id, wallet_id, amount, balance_after) VALUES
  ('f4a5b6c7-e9f0-1234-8901-567890123456', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'c1d2e3f4-a5b6-7890-4567-123456789012', 1400, 1400), -- Vikram VP
  ('a5b6c7d8-f0a1-2345-9012-678901234567', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'd2e3f4a5-b6c7-8901-5678-234567890123', 250, 250), -- Vikram RAD
  ('b6c7d8e9-a1b2-3456-0123-789012345678', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'e3f4a5b6-c7d8-9012-6789-345678901234', 350, 350), -- Vikram KC
  ('c7d8e9f0-b2c3-4567-1234-890123456789', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'f4a5b6c7-d8e9-0123-7890-456789012345', -1400, -6900), -- System VP
  ('d8e9f0a1-c3d4-5678-2345-901234567890', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'a5b6c7d8-e9f0-1234-8901-567890123456', -250, -1000), -- System RAD
  ('e9f0a1b2-d4e5-6789-3456-012345678901', 'e3f4a5b6-d8e9-0123-7890-456789012345', 'b6c7d8e9-f0a1-2345-9012-678901234567', -350, -1500); -- System KC
