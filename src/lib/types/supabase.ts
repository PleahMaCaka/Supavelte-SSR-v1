export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            dove_data: {
                Row: {
                    ammonia: number
                    humidity: number
                    temperature: number
                    time: string
                }
                Insert: {
                    ammonia: number
                    humidity: number
                    temperature: number
                    time: string
                }
                Update: {
                    ammonia?: number
                    humidity?: number
                    temperature?: number
                    time?: string
                }
                Relationships: []
            }
            profile: {
                Row: {
                    email: string | null
                    id: string
                    name: string | null
                    profile_url: string | null
                    team_id: string | null
                    team_req: string | null
                }
                Insert: {
                    email?: string | null
                    id: string
                    name?: string | null
                    profile_url?: string | null
                    team_id?: string | null
                    team_req?: string | null
                }
                Update: {
                    email?: string | null
                    id?: string
                    name?: string | null
                    profile_url?: string | null
                    team_id?: string | null
                    team_req?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "public_profile_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "public_profile_team_id_fkey"
                        columns: ["team_id"]
                        isOneToOne: false
                        referencedRelation: "team"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "public_profile_team_req_fkey"
                        columns: ["team_req"]
                        isOneToOne: false
                        referencedRelation: "team"
                        referencedColumns: ["owner"]
                    },
                ]
            }
            team: {
                Row: {
                    id: string
                    invite_code: string
                    invite_limit: number
                    members: string[] | null
                    name: string
                    owner: string
                }
                Insert: {
                    id?: string
                    invite_code: string
                    invite_limit?: number
                    members?: string[] | null
                    name?: string
                    owner?: string
                }
                Update: {
                    id?: string
                    invite_code?: string
                    invite_limit?: number
                    members?: string[] | null
                    name?: string
                    owner?: string
                }
                Relationships: []
            }
            team_attend_history: {
                Row: {
                    date: string
                    detail: string | null
                    logtime: string
                    status: Database["public"]["Enums"]["AttendStatus"]
                    team_id: string
                    user: string
                }
                Insert: {
                    date: string
                    detail?: string | null
                    logtime: string
                    status?: Database["public"]["Enums"]["AttendStatus"]
                    team_id: string
                    user: string
                }
                Update: {
                    date?: string
                    detail?: string | null
                    logtime?: string
                    status?: Database["public"]["Enums"]["AttendStatus"]
                    team_id?: string
                    user?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "public_team_attend_history_user_fkey"
                        columns: ["user"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            AttendStatus: "Waiting" | "Attend" | "Absent"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
            PublicSchema["Views"])
        ? (PublicSchema["Tables"] &
            PublicSchema["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends | keyof PublicSchema["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
        ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends | keyof PublicSchema["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
        ? PublicSchema["Enums"][PublicEnumNameOrOptions]
        : never
