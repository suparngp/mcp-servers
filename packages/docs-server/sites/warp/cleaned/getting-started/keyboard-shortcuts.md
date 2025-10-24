[Introducing Warp Code: the fastest way from prompt to productionLearn more ](https://www.warp.dev/blog/introducing-warp-code-prompt-to-prod)
 * * [Quickstart Guided](/)
 * [Migrate to Warp](/getting-started/migrate-to-warp)
 * [Supported Shells](/getting-started/supported-shells)
 * [Keyboard Shortcuts](/getting-started/keyboard-shortcuts)
 * [Changelog](/getting-started/changelog)
 * * [Agents Overview](/agents/agents-overview)
 * [Using Agents](/agents/using-agents)
 * [Slash Commands](/agents/slash-commands)
 * [Active AI](/agents/active-ai)
 * [Generate](/agents/generate)
 * [Voice](/agents/voice)
 * [AI FAQs](/agents/ai-faqs)
 * * [Code Overview](/code/code-overview)
 * [Code Editor](/code/code-editor)
 * [Codebase Context](/code/codebase-context)
 * [Code Review](/code/code-review)
 * [Code Diffs in Agent Conversations](/code/reviewing-code)
 * * [Universal Input](/terminal/universal-input)
 * [Appearance](/terminal/appearance)
 * [Blocks](/terminal/blocks)
 * [Modern Text Editing](/terminal/editor)
 * [Command Entry](/terminal/entry)
 * [Command Completions](/terminal/command-completions)
 * [Command Palette](/terminal/command-palette)
 * [Session Management](/terminal/sessions)
 * [Window Management](/terminal/windows)
 * [Warpify](/terminal/warpify)
 * [More Features](/terminal/more-features)
 * [Comparisons](/terminal/comparisons)
 * [Integrations](/terminal/integrations-and-plugins)
 * * [Warp Drive](/knowledge-and-collaboration/warp-drive)
 * [Model Context Protocol (MCP)](/knowledge-and-collaboration/mcp)
 * [Rules](/knowledge-and-collaboration/rules)
 * [Teams](/knowledge-and-collaboration/teams)
 * [Admin Panel](/knowledge-and-collaboration/admin-panel)
 * [Session Sharing](/knowledge-and-collaboration/session-sharing)
 * * [Warp CLI](/developers/cli)
 * * [Privacy](/privacy/privacy)
 * [Secret Redaction](/privacy/secret-redaction)
 * [Network Log](/privacy/network-log)
 * * [Refer a Friend & Earn Rewards](/community/refer-a-friend)
 * [Warp Preview & Alpha Program](/community/warp-preview-and-alpha-program)
 * * [Sending Feedback & Logs](/support-and-billing/sending-us-feedback)
 * [Plans & Pricing](/support-and-billing/plans-and-pricing)
 * [Updating Warp](/support-and-billing/updating-warp)
 * [Using Warp Offline](/support-and-billing/using-warp-offline)
 * [Logging Out & Uninstalling](/support-and-billing/uninstalling-warp)
 * [Known Issues](/support-and-billing/known-issues)
 * [Troubleshooting Login](/support-and-billing/troubleshooting-login-issues)
 * [Open Source Licenses](/support-and-billing/licenses)
[Powered by GitBook](https://www.gitbook.com/?utm_source=content&utm_medium=trademark&utm_campaign=-MbqIgTw17KQvq_DQuRr)
 * [Custom Keyboard Shortcuts](#custom-keyboard-shortcuts)
 * [All Available Shortcuts](#all-available-shortcuts)
Was this helpful?
Warp opens with a shortcut screen showing some of the most commonly used keyboard shortcuts. Hide the shortcut screen by clicking the x button. Quickly view keyboard shortcuts via the [Command Palette](/terminal/command-palette) or the Resource Center keyboard shortcut sidebar.
## 
[](#custom-keyboard-shortcuts)
Custom Keyboard Shortcuts
Set custom, clear, or default keyboard shortcuts by navigating to `Settings > Keyboard Shortcuts`. Search through the re-mappable actions or existing shortcuts using the search bar.
Remap the keyboard shortcuts using a file. See our [keysets repository](https://github.com/warpdotdev/keysets/tree/main) for instructions.
On macOS, [system keyboard shortcuts](https://support.apple.com/en-us/HT201236) like `CMD-ESC`, `CMD-BACKTICK`, `CMD-TAB`, `CMD-PERIOD`, and `CMD-TILDE` need to be [unbound](https://support.apple.com/guide/mac-help/keyboard-shortcuts-mchlp2262/mac) before you can use them in Warp.
Keybinds that conflict with others are highlighted with an orange border.
![keybinds that conflict with others are highlighted in orange](https://docs.warp.dev/~gitbook/image?url=https%3A%2F%2F2297236823-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MbqIgTw17KQvq_DQuRr%252Fuploads%252Fgit-blob-b1deaff708f95fdb8ebffe491a823ccea24bac6c%252Fkeybinds-conflict.png%3Falt%3Dmedia&width=768&dpr=4&quality=100&sign=70a5bd89&sv=2)
Keybind Conflict Example
## 
[](#all-available-shortcuts)
All Available Shortcuts
macOS
Windows
Linux
**Warp Essentials**
Shortcut
Command
Action
`CMD-D`
Split Pane Right
`pane_group:add_right`
`CTRL-CMD-L`
Launch Configuration Palette
`workspace:toggle_launch_config_palette`
`CTRL-CMD-T`
Open Theme Picker
`workspace:show_theme_chooser`
`CTRL-R`
Command Search
`workspace:show_command_search`
`CTRL-SHIFT-R`
Workflows
`input:toggle_workflows`
`CTRL-``
Generate
`input:toggle_natural_language_command_search`
`CMD-L`
Focus Terminal Input
`terminal:focus_input`
`CTRL-I`
Warpify Subshell
`terminal:trigger_subshell_bootstrap`
`CMD-\`
Warp Drive
`terminal:toggle_warp_drive`
`CMD-O`
File search
`CMD-P`
Open command pallette
**Blocks**
Shortcut
Command
Action
`ALT-DOWN`
Select the Closest Bookmark Down
`terminal:select_bookmark_down`
`ALT-SHIFT-CMD-C`
Copy Command Output
`terminal:copy_outputs`
`ALT-UP`
Select the Closest Bookmark Up
`terminal:select_bookmark_up`
`CMD-A`
Select All Blocks
`terminal:select_all_blocks`
`CMD-K`
Clear Blocks
`terminal:clear_blocks`
`CMD-B`
Bookmark Selected Block
`terminal:bookmark_selected_block`
`CMD-DOWN`
Select Next Block
`terminal:select_next_block`
`CMD-I`
Reinput Selected Commands
`terminal:reinput_commands`
`CMD-UP`
Select Previous Block
`terminal:select_previous_block`
`CTRL-M`
Open Block Context Menu
`terminal:open_block_list_context_menu_via_keybinding`
`SHIFT-CMD-C`
Copy Command
`terminal:copy_commands`
`SHIFT-CMD-I`
Reinput Selected Commands as Root
`terminal:reinput_commands_with_sudo`
`SHIFT-CMD-S`
Share Selected Block
`terminal:open_share_modal`
`SHIFT-DOWN`
Expand Selected Blocks Below
`terminal:expand_block_selection_below`
`SHIFT-UP`
Expand Selected Blocks Above
`terminal:expand_block_selection_above`
**Input Editor**
Shortcut
Command
Action
`ALT-BACKSPACE`
Delete Word Left
`editor:delete_word_left`
`ALT-CMD-F`
Fold Selected Ranges
`editor_view:fold_selected_ranges`
`ALT-CMD-[`
Fold
`editor_view:fold`
`ALT-CMD-]`
Unfold
`editor_view:unfold`
`ALT-DELETE`
Delete Word Right
`editor:delete_word_right`
`CMD-A`
Select All
`editor_view:select_all`
`CMD-BACKSPACE`
Delete All Left
`editor_view:delete_all_left`
`CMD-DELETE`
Delete All Right
`editor_view:delete_all_right`
`CMD-DOWN`
Move Cursor to the Bottom
`editor_view:cmd_down`
`CMD-I`
Inspect Command
`editor_view:cmd_i`
`CMD-LEFT`
Home
`editor_view:home`
`CMD-RIGHT`
End
`editor_view:end`
`CTRL-A`
Move to Start of Line
`editor_view:move_to_line_start`
`CTRL-B`
Move Cursor Left
`editor_view:left`
`CTRL-C`
Clear Command Editor
`editor_view:clear_buffer`
`CTRL-D`
Delete
`editor_view:delete`
`CTRL-E`
Move to End of Line
`editor_view:move_to_line_end`
`CTRL-F`
Move Cursor Right / Accept Autosuggestion
`editor_view:right`
`CTRL-G`
Add Selection for Next Occurrence
`editor_view:add_next_occurrence`
`CTRL-H`
Remove the Previous Character
`editor_view:backspace`
`CTRL-J`
Insert Newline
`editor_view:insert_newline`
`CTRL-K`
Cut All Right
`editor_view:cut_all_right`
`CTRL-L`
Clear Screen
`input:clear_screen`
`CTRL-N`
Move Cursor Down
`editor_view:down`
`CTRL-P`
Move Cursor Up
`editor_view:up`
`CTRL-SHIFT-A`
Select to Start of Line
`editor_view:select_to_line_start`
`CTRL-SHIFT-B`
Select One Character to the Left
`editor_view:select_left`
`CTRL-SHIFT-DOWN`
Add Cursor Below
`editor_view:add_cursor_below`
`CTRL-SHIFT-E`
Select to End of Line
`editor:select_to_line_end`
`CMD-Z`
Undo
`editor:undo`
`CMD-SHIFT-Z`
Redo
`editor:redo`
`CTRL-SHIFT-F`
Select One Character to the Right
`editor:select_right`
`CTRL-SHIFT-N`
Select Down
`editor_view:select_down`
`CTRL-SHIFT-P`
Select Up
`editor_view:select_up`
`CTRL-SHIFT-UP`
Add Cursor Above
`editor_view:add_cursor_above`
`CTRL-U`
Copy and Clear Selected Lines
`editor_view:clear_and_copy_lines`
`CTRL-W`
Cut Word Left
`editor_view:cut_word_left`
`META-.`
Insert Last Word of Previous Command
`editor:insert_last_word_previous_command`
`META-A`
Move to the Start of the Paragraph
`editor_view:move_to_paragraph_start`
`META-B`
Move Backward One Word
`editor_view:move_backward_one_word`
`META-D`
Cut Word Right
`editor_view:cut_word_right`
`META-E`
Move to the End of the Paragraph
`editor_view:move_to_paragraph_end`
`META-F`
Move Forward One Word
`editor_view:move_forward_one_word`
`CTRL-OPT-LEFT`
Move Backward One Subword
`editor_view:move_backward_one_subword`
`CTRL-OPT-RIGHT`
Move Forward One Subword
`editor_view:move_forward_one_subword`
`SHIFT-CMD-K`
Clear Selected Lines
`editor_view:clear_lines`
`SHIFT-META-<`
Move to the Start of the Buffer
`editor_view:move_to_buffer_start`
`SHIFT-META->`
Move to the End of the Buffer
`editor_view:move_to_buffer_end`
`SHIFT-META-B`
Select One Word to the Left
`editor_view:select_left_by_word`
`SHIFT-META-F`
Select One Word to the Right
`editor_view:select_right_by_word`
**Terminal**
Shortcut
Command
Action
`ALT-CMD-DOWN`
Switch Panes Down
`pane_group:navigate_down`
`ALT-CMD-LEFT`
Switch Panes Left
`pane_group:navigate_left`
`ALT-CMD-RIGHT`
Switch Panes Right
`pane_group:navigate_right`
`ALT-CMD-UP`
Switch Panes Up
`pane_group:navigate_up`
`ALT-CMD-V`
[a11y] Set Concise Accessibility Announcements
`workspace:set_a11y_concise_verbosity_level`
`ALT-CMD-V`
[a11y] Set Verbose Accessibility Announcements
`workspace:set_a11y_verbose_verbosity_level`
`CMD-,`
Open Settings
`workspace:show_settings_modal`
`CMD-,`
Open Settings: Account
`workspace:show_settings_account_page`
`CMD-G`
Find the Next Occurrence of Your Search Query
`find:find_next_occurrence`
`CMD-P`
Toggle Command Palette
`workspace:toggle_command_palette`
Toggle Mouse Reporting
`workspace:toggle_mouse_reporting`
`CMD-[`
Activate Previous Pane
`pane_group:navigate_prev`
`CMD-]`
Activate Next Pane
`pane_group:navigate_next`
`CTRL-CMD-DOWN`
Resize Pane > Move Divider Down
`pane_group:resize_down`
`CTRL-CMD-K`
Open Keybindings Editor
`workspace:show_keybinding_settings`
`CTRL-CMD-LEFT`
Resize Pane > Move Divider Left
`pane_group:resize_left`
`CTRL-CMD-RIGHT`
Resize Pane > Move Divider Right
`pane_group:resize_right`
`CTRL-CMD-UP`
Resize Pane > Move Divider Up
`pane_group:resize_up`
`CTRL-SHIFT-?`
Open Resource Center
`workspace:toggle_resource_center`
`SHIFT-CMD-D`
Split Pane Down
`pane_group:add_down`
`SHIFT-CMD-ENTER`
Toggle Maximize Active Pane
`pane_group:toggle_maximize_pane`
`SHIFT-CMD-G`
Find the Previous Occurrence of Your Search Query
`find:find_prev_occurrence`
`SHIFT-CMD-P`
Toggle Navigation Palette
`workspace:toggle_navigation_palette`
**Fundamentals**
Shortcut
Command
Action
`CMD--`
Decrease Font Size
`workspace:decrease_font_size`
`CMD-0`
Reset Font Size to Default
`workspace:reset_font_size`
`CMD-1`
Switch to 1st Tab
`workspace:activate_first_tab`
`CMD-2`
Switch to 2nd Tab
`workspace:activate_second_tab`
`CMD-3`
Switch to 3rd Tab
`workspace:activate_third_tab`
`CMD-4`
Switch to 4th Tab
`workspace:activate_fourth_tab`
`CMD-5`
Switch to 5th Tab
`workspace:activate_fifth_tab`
`CMD-6`
Switch to 6th Tab
`workspace:activate_sixth_tab`
`CMD-7`
Switch to 7th Tab
`workspace:activate_seventh_tab`
`CMD-8`
Switch to 8th Tab
`workspace:activate_eighth_tab`
`CMD-9`
Switch to Last Tab
`workspace:activate_last_tab`
`CMD-=`
Increase Font Size
`workspace:increase_font_size`
`CMD-C`
Copy
`terminal:copy`
`CMD-F`
Find
`terminal:find`
`CMD-V`
Paste
`terminal:paste`
`CMD-T`
Open New Tab
`workspace:open_new_tab`
`SHIFT-CMD-T`
Reopen Closed Tab
`workspace:reopen_closed_tab`
`CTRL-SHIFT-LEFT`
Move Tab Left
`workspace:move_tab_left`
`CTRL-SHIFT-RIGHT`
Move Tab Right
`workspace:move_tab_right`
`SHIFT-CMD-{`
Activate Previous Tab
`workspace:activate_prev_tab`
`SHIFT-CMD-}`
Activate Next Tab
`workspace:activate_next_tab`
**Warp Essentials**
Shortcut
Command
Action
`CTRL-SHIFT-D`
Split Pane Right
`pane_group:add_right`
Launch Configuration Palette
`workspace:toggle_launch_config_palette`
Open Theme Picker
`workspace:show_theme_chooser`
`CTRL-R`
Command Search
`workspace:show_command_search`
`CTRL-SHIFT-R`
Workflows
`input:toggle_workflows`
`CTRL-``
Generate
`input:toggle_natural_language_command_search`
`CTRL-SHIFT-L`
Focus Terminal Input
`terminal:focus_input`
`CTRL-I`
Warpify Subshell
`terminal:trigger_subshell_bootstrap`
`CTRL-SHIFT-\`
Warp Drive
`terminal:toggle_warp_drive`
**Blocks**
Shortcut
Command
Action
`ALT-DOWN`
Select the Closest Bookmark Down
`terminal:select_bookmark_down`
`CTRL-SHIFT-ALT-C`
Copy Command Output
`terminal:copy_outputs`
`ALT-UP`
Select the Closest Bookmark Up
`terminal:select_bookmark_up`
`CTRL-SHIFT-A`
Select All Blocks
`terminal:select_all_blocks`
`CTRL-SHIFT-K`
Clear Blocks
`terminal:clear_blocks`
`CTRL-SHIFT-B`
Bookmark Selected Block
`terminal:bookmark_selected_block`
`CTRL-DOWN`
Select Next Block
`terminal:select_next_block`
`CTRL-SHIFT-I`
Reinput Selected Commands
`terminal:reinput_commands`
`CTRL-UP`
Select Previous Block
`terminal:select_previous_block`
Open Block Context Menu
`terminal:open_block_list_context_menu_via_keybinding`
`CTRL-SHIFT-C`
Copy Command
`terminal:copy_commands`
Reinput Selected Commands as Root
`terminal:reinput_commands_with_sudo`
`CTRL-SHIFT-S`
Share Selected Block
`terminal:open_share_modal`
`SHIFT-DOWN`
Expand Selected Blocks Below
`terminal:expand_block_selection_below`
`SHIFT-UP`
Expand Selected Blocks Above
`terminal:expand_block_selection_above`
**Input Editor**
Shortcut
Command
Action
`CTRL-BACKSPACE`
Delete Word Left
`editor:delete_word_left`
`CTRL-ALT-F`
Fold Selected Ranges
`editor_view:fold_selected_ranges`
`CTRL-ALT-[`
Fold
`editor_view:fold`
`CTRL-ALT-]`
Unfold
`editor_view:unfold`
`CTRL-DELETE`
Delete Word Right
`editor:delete_word_right`
`CTRL-A`
Select All
`editor_view:select_all`
`CTRL-Y`
Delete All Left
`editor_view:delete_all_left`
Delete All Right
`editor_view:delete_all_right`
`CTRL-END`
Move Cursor to the Bottom
`editor_view:cmd_down`
`CTRL-I`
Inspect Command
`editor_view:cmd_i`
`HOME`
Home
`editor_view:home`
`END`
End
`editor_view:end`
`CTRL-A`
Move to Start of Line
`editor_view:move_to_line_start`
`CTRL-B`
Move Cursor Left
`editor_view:left`
`CTRL-C`
Clear Command Editor
`editor_view:clear_buffer`
`CTRL-D`
Delete
`editor_view:delete`
`CTRL-E`
Move to End of Line
`editor_view:move_to_line_end`
`CTRL-F`
Move Cursor Right / Accept Autosuggestion
`editor_view:right`
`CTRL-G`
Add Selection for Next Occurrence
`editor_view:add_next_occurrence`
`CTRL-H`
Remove the Previous Character
`editor_view:backspace`
`CTRL-J`
Insert Newline
`editor_view:insert_newline`
`CTRL-K`
Cut All Right
`editor_view:cut_all_right`
`CTRL-L`
Clear Screen
`input:clear_screen`
`CTRL-N`
Move Cursor Down
`editor_view:down`
`CTRL-P`
Move Cursor Up
`editor_view:up`
Select to Start of Line
`editor_view:select_to_line_start`
`CTRL-SHIFT-B`
Select One Character to the Left
`editor_view:select_left`
`CTRL-SHIFT-DOWN`
Add Cursor Below
`editor_view:add_cursor_below`
Select to End of Line
`editor:select_to_line_end`
`CTRL-Z`
Undo
`editor:undo`
`CTRL-SHIFT-Z`
Redo
`editor:redo`
`CTRL-SHIFT-F`
Select One Character to the Right
`editor:select_right`
Select Down
`editor_view:select_down`
`CTRL-SHIFT-P`
Select Up
`editor_view:select_up`
`CTRL-SHIFT-UP`
Add Cursor Above
`editor_view:add_cursor_above`
`CTRL-U`
Copy and Clear Selected Lines
`editor_view:clear_and_copy_lines`
`CTRL-W`
Cut Word Left
`editor_view:cut_word_left`
`META-.`
Insert Last Word of Previous Command
`editor:insert_last_word_previous_command`
`META-A`
Move to the Start of the Paragraph
`editor_view:move_to_paragraph_start`
`CTRL-LEFT`
Move Backward One Word
`editor_view:move_backward_one_word`
`ALT-D`
Cut Word Right
`editor_view:cut_word_right`
`META-E`
Move to the End of the Paragraph
`editor_view:move_to_paragraph_end`
`CTRL-RIGHT`
Move Forward One Word
`editor_view:move_forward_one_word`
`CTRL-ALT-LEFT`
Move Backward One Subword
`editor_view:move_backward_one_subword`
`CTRL-ALT-RIGHT`
Move Forward One Subword
`editor_view:move_forward_one_subword`
`SHIFT-META-<`
Move to the Start of the Buffer
`editor_view:move_to_buffer_start`
`SHIFT-META->`
Move to the End of the Buffer
`editor_view:move_to_buffer_end`
`CTRL-SHIFT-LEFT`
Select One Word to the Left
`editor_view:select_left_by_word`
`CTRL-SHIFT-RIGHT`
Select One Word to the Right
`editor_view:select_right_by_word`
**Terminal**
Shortcut
Command
Action
`CTRL-ALT-DOWN`
Switch Panes Down
`pane_group:navigate_down`
`CTRL-ALT-LEFT`
Switch Panes Left
`pane_group:navigate_left`
`CTRL-ALT-RIGHT`
Switch Panes Right
`pane_group:navigate_right`
`CTRL-ALT-UP`
Switch Panes Up
`pane_group:navigate_up`
`CTRL-ALT-V`
[a11y] Set Concise Accessibility Announcements
`workspace:set_a11y_concise_verbosity_level`
`CTRL-ALT-V`
[a11y] Set Verbose Accessibility Announcements
`workspace:set_a11y_verbose_verbosity_level`
`CTRL-,`
Open Settings
`workspace:show_settings_modal`
`CTRL-,`
Open Settings: Account
`workspace:show_settings_account_page`
`F3`
Find the Next Occurrence of Your Search Query
`find:find_next_occurrence`
`CTRL-SHIFT-P`
Toggle Command Palette
`workspace:toggle_command_palette`
Toggle Mouse Reporting
`workspace:toggle_mouse_reporting`
`CTRL-SHIFT-[`
Activate Previous Pane
`pane_group:navigate_prev`
`CTRL-SHIFT-]`
Activate Next Pane
`pane_group:navigate_next`
Resize Pane > Move Divider Down
`pane_group:resize_down`
`CTRL-CMD-K`
Open Keybindings Editor
`workspace:show_keybinding_settings`
Resize Pane > Move Divider Left
`pane_group:resize_left`
Resize Pane > Move Divider Right
`pane_group:resize_right`
Resize Pane > Move Divider Up
`pane_group:resize_up`
`CTRL-SHIFT-/`
Open Resource Center
`workspace:toggle_resource_center`
`CTRL-SHIFT-E`
Split Pane Down
`pane_group:add_down`
`CTRL-SHIFT-ENTER`
Toggle Maximize Active Pane
`pane_group:toggle_maximize_pane`
`SHIFT-F3`
Find the Previous Occurrence of Your Search Query
`find:find_prev_occurrence`
Toggle Navigation Palette
`workspace:toggle_navigation_palette`
**Fundamentals**
Shortcut
Command
Action
`CTRL--`
Decrease Font Size
`workspace:decrease_font_size`
`CTRL-0`
Reset Font Size to Default
`workspace:reset_font_size`
`CTRL-1`
Switch to 1st Tab
`workspace:activate_first_tab`
`CTRL-2`
Switch to 2nd Tab
`workspace:activate_second_tab`
`CTRL-3`
Switch to 3rd Tab
`workspace:activate_third_tab`
`CTRL-4`
Switch to 4th Tab
`workspace:activate_fourth_tab`
`CTRL-5`
Switch to 5th Tab
`workspace:activate_fifth_tab`
`CTRL-6`
Switch to 6th Tab
`workspace:activate_sixth_tab`
`CTRL-7`
Switch to 7th Tab
`workspace:activate_seventh_tab`
`CTRL-8`
Switch to 8th Tab
`workspace:activate_eighth_tab`
`CTRL-9`
Switch to Last Tab
`workspace:activate_last_tab`
`CTRL-=`
Increase Font Size
`workspace:increase_font_size`
`CTRL-SHIFT-C`
Copy
`terminal:copy`
`CTRL-SHIFT-F`
Find
`terminal:find`
`CTRL-SHIFT-V`
Paste
`terminal:paste`
`CTRL-SHIFT-T`
Open New Tab
`workspace:open_new_tab`
`CTRL-ALT-T`
Reopen Closed Tab
`workspace:reopen_closed_tab`
`CTRL-SHIFT-LEFT`
Move Tab Left
`workspace:move_tab_left`
`CTRL-SHIFT-RIGHT`
Move Tab Right
`workspace:move_tab_right`
`CTRL-PAGEUP`
Activate Previous Tab
`workspace:activate_prev_tab`
`CTRL-PAGEDOWN`
Activate Next Tab
`workspace:activate_next_tab`
**Warp Essentials**
Shortcut
Command
Action
`CTRL-SHIFT-D`
Split Pane Right
`pane_group:add_right`
Launch Configuration Palette
`workspace:toggle_launch_config_palette`
Open Theme Picker
`workspace:show_theme_chooser`
`CTRL-R`
Command Search
`workspace:show_command_search`
`CTRL-SHIFT-R`
Workflows
`input:toggle_workflows`
`CTRL-``
Generate
`input:toggle_natural_language_command_search`
`CTRL-SHIFT-L`
Focus Terminal Input
`terminal:focus_input`
`CTRL-I`
Warpify Subshell
`terminal:trigger_subshell_bootstrap`
`CTRL-SHIFT-\`
Warp Drive
`terminal:toggle_warp_drive`
**Blocks**
Shortcut
Command
Action
`ALT-DOWN`
Select the Closest Bookmark Down
`terminal:select_bookmark_down`
`CTRL-SHIFT-ALT-C`
Copy Command Output
`terminal:copy_outputs`
`ALT-UP`
Select the Closest Bookmark Up
`terminal:select_bookmark_up`
`CTRL-SHIFT-A`
Select All Blocks
`terminal:select_all_blocks`
`CTRL-SHIFT-K`
Clear Blocks
`terminal:clear_blocks`
`CTRL-SHIFT-B`
Bookmark Selected Block
`terminal:bookmark_selected_block`
`CTRL-DOWN`
Select Next Block
`terminal:select_next_block`
`CTRL-SHIFT-I`
Reinput Selected Commands
`terminal:reinput_commands`
`CTRL-UP`
Select Previous Block
`terminal:select_previous_block`
Open Block Context Menu
`terminal:open_block_list_context_menu_via_keybinding`
`CTRL-SHIFT-C`
Copy Command
`terminal:copy_commands`
Reinput Selected Commands as Root
`terminal:reinput_commands_with_sudo`
`CTRL-SHIFT-S`
Share Selected Block
`terminal:open_share_modal`
`SHIFT-DOWN`
Expand Selected Blocks Below
`terminal:expand_block_selection_below`
`SHIFT-UP`
Expand Selected Blocks Above
`terminal:expand_block_selection_above`
**Input Editor**
Shortcut
Command
Action
`CTRL-BACKSPACE`
Delete Word Left
`editor:delete_word_left`
`CTRL-ALT-F`
Fold Selected Ranges
`editor_view:fold_selected_ranges`
`CTRL-ALT-[`
Fold
`editor_view:fold`
`CTRL-ALT-]`
Unfold
`editor_view:unfold`
`CTRL-DELETE`
Delete Word Right
`editor:delete_word_right`
`CTRL-A`
Select All
`editor_view:select_all`
`CTRL-Y`
Delete All Left
`editor_view:delete_all_left`
Delete All Right
`editor_view:delete_all_right`
`CTRL-END`
Move Cursor to the Bottom
`editor_view:cmd_down`
`CTRL-I`
Inspect Command
`editor_view:cmd_i`
`HOME`
Home
`editor_view:home`
`END`
End
`editor_view:end`
`CTRL-A`
Move to Start of Line
`editor_view:move_to_line_start`
`CTRL-B`
Move Cursor Left
`editor_view:left`
`CTRL-C`
Clear Command Editor
`editor_view:clear_buffer`
`CTRL-D`
Delete
`editor_view:delete`
`CTRL-E`
Move to End of Line
`editor_view:move_to_line_end`
`CTRL-F`
Move Cursor Right / Accept Autosuggestion
`editor_view:right`
`CTRL-G`
Add Selection for Next Occurrence
`editor_view:add_next_occurrence`
`CTRL-H`
Remove the Previous Character
`editor_view:backspace`
`CTRL-J`
Insert Newline
`editor_view:insert_newline`
`CTRL-K`
Cut All Right
`editor_view:cut_all_right`
`CTRL-L`
Clear Screen
`input:clear_screen`
`CTRL-N`
Move Cursor Down
`editor_view:down`
`CTRL-P`
Move Cursor Up
`editor_view:up`
Select to Start of Line
`editor_view:select_to_line_start`
`CTRL-SHIFT-B`
Select One Character to the Left
`editor_view:select_left`
`CTRL-SHIFT-DOWN`
Add Cursor Below
`editor_view:add_cursor_below`
Select to End of Line
`editor:select_to_line_end`
`CTRL-Z`
Undo
`editor:undo`
`CTRL-SHIFT-Z`
Redo
`editor:redo`
`CTRL-SHIFT-F`
Select One Character to the Right
`editor:select_right`
Select Down
`editor_view:select_down`
`CTRL-SHIFT-P`
Select Up
`editor_view:select_up`
`CTRL-SHIFT-UP`
Add Cursor Above
`editor_view:add_cursor_above`
`CTRL-U`
Copy and Clear Selected Lines
`editor_view:clear_and_copy_lines`
`CTRL-W`
Cut Word Left
`editor_view:cut_word_left`
`META-.`
Insert Last Word of Previous Command
`editor:insert_last_word_previous_command`
`META-A`
Move to the Start of the Paragraph
`editor_view:move_to_paragraph_start`
`CTRL-LEFT`
Move Backward One Word
`editor_view:move_backward_one_word`
`ALT-D`
Cut Word Right
`editor_view:cut_word_right`
`META-E`
Move to the End of the Paragraph
`editor_view:move_to_paragraph_end`
`CTRL-RIGHT`
Move Forward One Word
`editor_view:move_forward_one_word`
`CTRL-ALT-LEFT`
Move Backward One Subword
`editor_view:move_backward_one_subword`
`CTRL-ALT-RIGHT`
Move Forward One Subword
`editor_view:move_forward_one_subword`
`SHIFT-META-<`
Move to the Start of the Buffer
`editor_view:move_to_buffer_start`
`SHIFT-META->`
Move to the End of the Buffer
`editor_view:move_to_buffer_end`
`CTRL-SHIFT-LEFT`
Select One Word to the Left
`editor_view:select_left_by_word`
`CTRL-SHIFT-RIGHT`
Select One Word to the Right
`editor_view:select_right_by_word`
**Terminal**
Shortcut
Command
Action
`CTRL-ALT-DOWN`
Switch Panes Down
`pane_group:navigate_down`
`CTRL-ALT-LEFT`
Switch Panes Left
`pane_group:navigate_left`
`CTRL-ALT-RIGHT`
Switch Panes Right
`pane_group:navigate_right`
`CTRL-ALT-UP`
Switch Panes Up
`pane_group:navigate_up`
`CTRL-ALT-V`
[a11y] Set Concise Accessibility Announcements
`workspace:set_a11y_concise_verbosity_level`
`CTRL-ALT-V`
[a11y] Set Verbose Accessibility Announcements
`workspace:set_a11y_verbose_verbosity_level`
`CTRL-,`
Open Settings
`workspace:show_settings_modal`
`CTRL-,`
Open Settings: Account
`workspace:show_settings_account_page`
`F3`
Find the Next Occurrence of Your Search Query
`find:find_next_occurrence`
`CTRL-SHIFT-P`
Toggle Command Palette
`workspace:toggle_command_palette`
Toggle Mouse Reporting
`workspace:toggle_mouse_reporting`
`CTRL-SHIFT-[`
Activate Previous Pane
`pane_group:navigate_prev`
`CTRL-SHIFT-]`
Activate Next Pane
`pane_group:navigate_next`
Resize Pane > Move Divider Down
`pane_group:resize_down`
`CTRL-CMD-K`
Open Keybindings Editor
`workspace:show_keybinding_settings`
Resize Pane > Move Divider Left
`pane_group:resize_left`
Resize Pane > Move Divider Right
`pane_group:resize_right`
Resize Pane > Move Divider Up
`pane_group:resize_up`
`CTRL-SHIFT-/`
Open Resource Center
`workspace:toggle_resource_center`
`CTRL-SHIFT-E`
Split Pane Down
`pane_group:add_down`
`CTRL-SHIFT-ENTER`
Toggle Maximize Active Pane
`pane_group:toggle_maximize_pane`
`SHIFT-F3`
Find the Previous Occurrence of Your Search Query
`find:find_prev_occurrence`
Toggle Navigation Palette
`workspace:toggle_navigation_palette`
**Fundamentals**
Shortcut
Command
Action
`CTRL--`
Decrease Font Size
`workspace:decrease_font_size`
`CTRL-0`
Reset Font Size to Default
`workspace:reset_font_size`
`CTRL-1`
Switch to 1st Tab
`workspace:activate_first_tab`
`CTRL-2`
Switch to 2nd Tab
`workspace:activate_second_tab`
`CTRL-3`
Switch to 3rd Tab
`workspace:activate_third_tab`
`CTRL-4`
Switch to 4th Tab
`workspace:activate_fourth_tab`
`CTRL-5`
Switch to 5th Tab
`workspace:activate_fifth_tab`
`CTRL-6`
Switch to 6th Tab
`workspace:activate_sixth_tab`
`CTRL-7`
Switch to 7th Tab
`workspace:activate_seventh_tab`
`CTRL-8`
Switch to 8th Tab
`workspace:activate_eighth_tab`
`CTRL-9`
Switch to Last Tab
`workspace:activate_last_tab`
`CTRL-=`
Increase Font Size
`workspace:increase_font_size`
`CTRL-SHIFT-C`
Copy
`terminal:copy`
`CTRL-SHIFT-F`
Find
`terminal:find`
`CTRL-SHIFT-V`
Paste
`terminal:paste`
`CTRL-SHIFT-T`
Open New Tab
`workspace:open_new_tab`
`CTRL-ALT-T`
Reopen Closed Tab
`workspace:reopen_closed_tab`
`CTRL-SHIFT-LEFT`
Move Tab Left
`workspace:move_tab_left`
`CTRL-SHIFT-RIGHT`
Move Tab Right
`workspace:move_tab_right`
`CTRL-PAGEUP`
Activate Previous Tab
`workspace:activate_prev_tab`
`CTRL-PAGEDOWN`
Activate Next Tab
`workspace:activate_next_tab`
[PreviousSupported Shells](/getting-started/supported-shells)[NextChangelog](/getting-started/changelog)
Last updated 1 month ago
Was this helpful?