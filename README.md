# TODO LIST 

* [x] Implementare validation form lato client su Registrati.
  * [x] Esempio con Reack-hook-form. 
* [x] Implementare la update profile lato client.
  * [ ] servire l'avatar nel profile
* [x] Creare tabelle supabase. 
  * [x] Favourites. 
    * id - type uuid - value gen random id()
    * created_at - timestamps - now()
    * profile_id - type uuid - auth.uid()
    * game_id - text - null 
    * game_name - text - null  

    Foreign keys
    favorites_profile_id_fkey
    profile_id -> public.profiles.id

    polices 
    Enable read access for all users SELECT
    Enable users to delete favorites games DELETE 
    Users can insert their own favorites games INSERT 
  * [x] Chat Messages.
  * A table to store messages 
    content - text - null
    profile_id - uuid - auth.id()
    game_id - text - null

    favorites_profile_id_fkey
    profile_id -> public.profiles.id

    polices 
    Enable read access for all users SELECT
    Users can insert their own messages INSERT

  * [x] Abilitare Real Time socket su supabase
    * [x] database/publications enable messages table   
* [ ] Implementare la chat real time
  * [ ] Subscribe on realtime changes in your database on().subscribe()
* [ ] Implementare aggiunta e visualizzazione giochi favoriti.
* Fine.