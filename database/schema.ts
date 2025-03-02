import { text, pgTable, uuid, varchar, pgEnum, timestamp} from "drizzle-orm/pg-core";

export const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);
export const STATUS_ENUM = pgEnum("status", ["BOOKED", "NOT_BOOKED"]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {length: 255}).notNull(),
  email: text("email").notNull().unique(),
  role: ROLE_ENUM("role").default("USER"),
  status: STATUS_ENUM("status").default("NOT_BOOKED"),
  password: text("password").notNull(),
  bookingId: uuid("booking_id"),
  createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  date: timestamp("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  userId: uuid("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at", {withTimezone: true}).defaultNow(),
});
