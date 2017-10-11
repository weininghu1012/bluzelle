#ifndef KEPLER_BZVISUALIZATIONPANEL_H
#define KEPLER_BZVISUALIZATIONPANEL_H

#include <wx/wxprec.h>
#include <wx/image.h>
#include <wx/listctrl.h>

#include "ThreadManager.h"

#ifndef WX_PRECOMP
    #include <wx/wx.h>
#endif


class Node
{
public:
    enum State { born, alive, dead, remove};
    Node(const std::string& id, int messages = 0) :
            _id(id),
            _state(State::born),
            _state_start(time(nullptr)),
            _messages(messages)
    {

    }

    const char * getid() {return _id.c_str();}
    State get_state() { return _state;}
    void set_state(const State& state )
    {
        _state = state;
        _state_start = time(nullptr);
    }

    void set_messages(int n) { _messages = n; }
    int get_messages() { return _messages; }
    time_t get_state_time()
    {
        time_t duration = time(nullptr) - _state_start;
        return duration;
    }

private:
    std::string _id;
    State       _state;
    time_t      _state_start;
    int         _messages;

};


class BZVisualizationPanel : public wxPanel
{
private:
    std::vector<std::shared_ptr<Node>> _nodes;
    void remove_nodes();
    void push_new_nodes(const std::vector<std::string>& nodes);
    void set_node_states(const std::vector<std::string>& nodes);

protected:
    DECLARE_EVENT_TABLE()

public:
    BZVisualizationPanel(wxFrame* parent);
    void paintEvent(wxPaintEvent& evt);
    void paintNow();
    void render(wxDC& dc);
    void update_node_data(const std::vector<std::string>& node_data);

};

#endif //KEPLER_BZVISUALIZATIONPANEL_H
