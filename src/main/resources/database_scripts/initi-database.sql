-- CreateTable
CREATE TABLE tracker."users" (
                               "id" BIGSERIAL NOT NULL,
                                "username" varchar,
                                "firstName" varchar,
                                "lastName" varchar,
                                "password" varchar,
                                "token" varchar,
                                "role" varchar,
                                "enabled" boolean,
                                "isAdmin" boolean,
                                CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE tracker."task" ("id" BIGSERIAL NOT NULL,
                                "car_type" varchar,
                                "description" TEXT,
                                "price" TEXT,
                                "password" TEXT,
                                "title" TEXT,
                                CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE tracker."roles" ("role_id" integer NOT NULL,
                          "name" varchar,
                          CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

CREATE TABLE tracker."users_roles" ("role_id" integer NOT NULL,
                          "user_id" varchar,
                              CONSTRAINT "users_roles_pkey" PRIMARY KEY ("role_id","user_id")
);